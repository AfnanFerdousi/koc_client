import Head from 'next/head';
import React from 'react';
import Chat from './../../components/chat/Chat';

const Messages = () => {
    return (
        <div>
            <Head>
                <title>Messages | KocFreelancing</title>
            </Head>

            <Chat />
        </div>
    );
};

export default Messages;