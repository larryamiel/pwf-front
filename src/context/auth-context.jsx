import React, { useContext, useEffect, useState } from 'react'
import { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext({
	isAuth: false,
	isLoading: true,
	user: null,
	login: () => {},
	logout: () => {}
});

const AuthProvider = ({ children }) => {  
	// check if user is logged in from local storage
	const localUser = localStorage.getItem('pwf-user');
	
	let hasLocalUser = false;
	let localUserObject = null;

	if (localUser) {
		hasLocalUser = true;
		localUserObject = JSON.parse(localUser);
	}

	const [isAuth, setIsAuth] = useState(hasLocalUser);
	const [user, setUser] = useState(localUserObject);
	
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				// get user from firestore
				const userRef = doc(db, 'users', user.uid);
				const userData = await getDoc(userRef);

				const userObject = {
						...user,
						...userData.data()
				};

				setIsAuth(true);
				setUser(userObject);

				console.log('logging in:', userData.data(), user.uid);

				// store user and isauth in local storage
				localStorage.setItem('pwf-user', JSON.stringify(userObject));
			} else {
				setIsAuth(false);
				setUser(null);

				// remove user and isauth from local storage
				localStorage.removeItem('pwf-user');
			}
		});
	}, []);

	const login = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;

				// get user from firestore
				const userRef = doc(db, 'users', user.uid);
				const userData = await getDoc(userRef);

				const userObject = {
						...user,
						...userData.data()
				};

				setIsAuth(true);
				setUser(userObject);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log('Auth Error:', errorCode, errorMessage);
			});
	};

	const register = async (data) => {
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;

				// add user to firestore
				const userRef = doc(db, 'users', user.uid);
				await userRef.set(data);

				const userObject = {
						...user,
						...data
				};

				setIsAuth(true);
				setUser(userObject);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log('Auth Error:', errorCode, errorMessage);
			});
	};

	const logout = () => {
		auth.signOut().then(() => {
			setIsAuth(false);
			setUser(null);
		}).catch((error) => {
			// An error happened.
			console.log(error);
		});
	}

	return (
		<AuthContext.Provider value={{ isAuth, user, role, ministry, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error(
			`useAuth must be used within a AuthProvider`
		);
	}

	return context;
}

export { useAuth, AuthContext, AuthProvider };