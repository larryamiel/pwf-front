import React, { useContext, useEffect, useState } from 'react'
import { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext({
	isAuth: false,
	isLoading: true,
	user: null,
	login: async () => {},
	register: async () => {},
	create: async () => {},
	logout: async () => {}
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
	const [role, setRole] = useState(null);
	const [ministry, setMinistry] = useState(null);
	
	useEffect(() => {
		const changed = auth.onAuthStateChanged(async (user) => {
			if (user) {
				// get user from firestore
				const userRef = doc(db, 'users', user.uid);
				const userData = await getDoc(userRef);

				const userObject = {
					...user,
					data: userData.data()
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

		return changed;
	}, []);

	const login = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				// const user = userCredential.user;

				// // get user from firestore
				// const userRef = doc(db, 'users', user.uid);
				// const userData = await getDoc(userRef);

				// const userObject = {
				// 	...user,
				// 	...userData.data()
				// };

				// setIsAuth(true);
				// setUser(userObject);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				alert('Unable to login, incorrect credentials.');

				console.log('Auth Error:', errorCode, errorMessage);
			});
	};

	const register = async (data) => {
		// check data
		try {
			if (!data.email || !data.password) {
				throw new Error('Missing required fields');
			}

			createUserWithEmailAndPassword(auth, data.email, data.password)
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					console.log('Auth Error:', errorCode, errorMessage);
				});
		} catch (err) {
			console.log('Register Error:', err);
		}
	};

	const create = async (data) => {
		// check data
		try {
			if (!data.name || !data.phone || !data.username) {
				throw new Error('Missing required fields');
			}

			// add user to firestore
			const userRef = doc(db, 'users', user.uid);
			await setDoc(userRef, data);

			const userObject = {
				...user,
				data
			};

			setIsAuth(true);
			setUser(userObject);

			// store user and isauth in local storage
			localStorage.setItem('pwf-user', JSON.stringify(userObject));
		} catch (err) {
			console.log('Register Error:', err);
		}
	}

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
		<AuthContext.Provider value={{ isAuth, user, role, ministry, login, register, create, logout }}>
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