import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./interfaces/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const {authStore} = useContext(Context);

    const [users, setUsers] = useState<IUser[]>([]);


    useEffect(() => {
            if (localStorage.getItem('token')) {
                authStore.checkAuth()
            }
        }, []
    )

    const getUsers = async () => {
        setUsers([]);
        try {
            const response = await UserService.getAll();
            setUsers(response.data);

        } catch (e) {
            console.log(e)
        }
    }

    if (authStore.isLoading) {
        return (
            <h1>Завантаження</h1>
        );
    }

    if (!authStore.isAuth) {
        return (
            <>
                <LoginForm/>
                <div>
                    <button onClick={getUsers}>Отримати всіх користувачів</button>
                </div>
            </>
        );
    }

    return (
        <div>
            <h1>{authStore.isAuth ? `Ви зареєстровані ${authStore.user.email}` : 'Не зареєстровані'}</h1>
            <h1>{authStore.user.isActivated ? `${authStore.user.email} активований` : 'Не активований'}</h1>
            <button onClick={() => authStore.logout()}>Вийти</button>
            <div>
                <button onClick={getUsers}>Отримати всіх користувачів</button>
            </div>
            <ul>
                {
                    users.map(user => <li key={user.id}>{user.email}</li>)
                }
            </ul>
        </div>

    );
}

export default observer(App);
