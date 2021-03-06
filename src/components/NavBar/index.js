import React from 'react';

import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/';

import { hendleDBactions } from '../../actions/handleDB';
var cx = require('classnames');
function Navbar(props) {
    const { isAuthenticated, dispatch, CurrentUser, isAdminAccount, deviceM, ActiveNav } = props;
    const [withMData, setWithMData] = React.useState(false);
    const [VIPactive, setVIPactive] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(deviceM);
    const [nowActive, setNowActive] = React.useState(ActiveNav);
    const handleLogout = i => {
        setNowActive(i);
        setVIPactive(false);
        dispatch(logoutUser());
    };

    const userWithoutData = () => {
        if (CurrentUser) {
            const { email } = CurrentUser;
            hendleDBactions('memberCard', email, '', 'getMemberCardByEmail', handleUserData);
        }
    };

    const handleUserData = d => {
        d.noData ? setWithMData(true) : setWithMData(false);
    };
    React.useEffect(() => {
        userWithoutData();
    }, [CurrentUser]);
    React.useEffect(() => {
        setNowActive(ActiveNav);
    }, [ActiveNav]);

    const LocationHash = (i, where) => {
        if (where !== '') {
            setTimeout((window.location.hash = where), 3000);
        }
        setNowActive(i);
    };

    const handleRWD = () => {
        window.innerWidth > 576 ? setIsMobile(false) : setIsMobile(true);
    };

    React.useEffect(() => {
        handleRWD();
        window.addEventListener('resize', handleRWD);

        return () => {
            window.removeEventListener('resize', handleRWD);
        };
    }, []);

    return (
        <>
            <ul className={cx({ mobileBar: isMobile })}>
                {CurrentUser && VIPactive ? (
                    <li className="sayHiString">
                        Welcome back!
                        {CurrentUser.memberData && CurrentUser.memberData.UserName !== undefined
                            ? ' ' + CurrentUser.memberData.UserName
                            : ''}
                    </li>
                ) : null}
                {!VIPactive ? (
                    <>
                        <li className={cx('nav-0', { active: nowActive === 0 })}>
                            <a href="/TopHome#Outlets" onClick={() => LocationHash(0, '#Outlets')}>
                                About us
                                {isMobile ? null : <br />}
                                關於我們
                            </a>
                        </li>
                        <li className={cx('nav-1', { active: nowActive === 1 })}>
                            <a href="/TopHome#Rules" onClick={() => LocationHash(1, '#Rules')}>
                                Rules
                                {isMobile ? null : <br />}
                                規制
                            </a>
                        </li>
                        <li className={cx('nav-2', { active: nowActive === 2 })}>
                            <a
                                href="/TopHome#Calendar"
                                onClick={() => LocationHash(2, '#Calendar')}
                            >
                                Calender
                                {isMobile ? null : <br />}
                                日曆
                            </a>
                        </li>
                        <li className={cx('nav-3', { active: nowActive === 3 })}>
                            <a href="/TopHome#Steps" onClick={() => LocationHash(3, '#Steps')}>
                                Join us
                                {isMobile ? null : <br />}
                                加入我們
                            </a>
                        </li>
                    </>
                ) : null}
                {!isAuthenticated ? (
                    <li
                        className={cx('nav-1', { active: nowActive === 8 })}
                        onClick={() => LocationHash(8, '')}
                    >
                        <Link to="/login">
                            Log in
                            {isMobile ? null : <br />}
                            登入
                        </Link>
                    </li>
                ) : null}

                {!isAuthenticated ? (
                    <>
                        <li
                            className={cx('nav-1', { active: nowActive === 7 })}
                            onClick={() => LocationHash(7, '')}
                        >
                            <Link to="/signup">
                                Sign up
                                {isMobile ? null : <br />}
                                註冊
                            </Link>
                        </li>
                    </>
                ) : null}
                {isAdminAccount ? (
                    <li
                        className={cx('nav-1', { active: nowActive === 4 })}
                        onClick={() => LocationHash(4, '')}
                    >
                        <Link to="/admin">MemberList{isMobile ? null : <br />}會員清單 </Link>
                    </li>
                ) : null}
                {isAuthenticated ? (
                    <>
                        <li
                            className={cx('nav-1', { active: nowActive === 5 })}
                            onClick={() => LocationHash(5, '')}
                        >
                            <Link
                                to="/"
                                onClick={() => {
                                    setVIPactive(true);
                                }}
                            >
                                Vip {isMobile ? null : <br />} 會員專區
                            </Link>
                        </li>
                        <li className={cx('nav-1', { active: nowActive === 6 })}>
                            <a onClick={handleLogout}>
                                Log out
                                {isMobile ? null : <br />}
                                登出
                            </a>
                        </li>
                    </>
                ) : null}
            </ul>
        </>
    );
}

export default Navbar;
