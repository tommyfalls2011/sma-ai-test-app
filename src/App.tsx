// Corrected JSX syntax for the chat application

import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [page, setPage] = useState('login');
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([{ id: 1, name: 'General' }]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState(['User1', 'User2']);
    const [newRoomName, setNewRoomName] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    const login = () => setUser({ name: 'Sample User' });

    const logout = () => {
        setUser(null);
        setPage('login');
    };

    const createRoom = () => {
        const newRoom = { id: rooms.length + 1, name: newRoomName };
        setRooms([...rooms, newRoom]);
        setNewRoomName('');
    };

    const sendMessage = () => {
        const message = { sender: user.name, content: newMessage, timestamp: new Date().toLocaleTimeString() };
        setMessages([...messages, message]);
        setNewMessage('');
        setTimeout(() => {
            if (messageEndRef.current) {
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex">
            {user ? (
                <div className="flex w-full">
                    <aside className="bg-gray-800 w-1/4 p-4">
                        <h2 className="font-bold text-xl mb-4">Chat Rooms</h2>
                        {rooms.map(room => (
                            <div key={room.id}
                                className={`p-2 rounded-lg mb-2 cursor-pointer shadow-sm hover:bg-gray-700 transition-colors ${currentRoom && room.id === currentRoom.id ? 'bg-gray-700' : ''}`}
                                onClick={() => setCurrentRoom(room)}
                            >
                                {room.name}
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="New room..."
                            value={newRoomName}
                            onChange={e => setNewRoomName(e.target.value)}
                            className="bg-gray-700 p-2 rounded-lg w-full mt-2"
                        />
                        <button onClick={createRoom} className="bg-blue-500 p-2 rounded-lg mt-2 shadow-sm hover:bg-blue-600 transition-colors w-full">Create Room</button>
                        <button onClick={logout} className="bg-red-500 p-2 rounded-lg mt-2 shadow-sm hover:bg-red-600 transition-colors w-full">Logout</button>
                    </aside>
                    <main className="flex-1 flex flex-col">
                        {currentRoom ? (
                            <React.Fragment>
                                <div className="flex-1 p-4 overflow-y-scroll">
                                    <h2 className="text-2xl font-bold">{currentRoom.name}</h2>
                                    {messages.map((msg, index) => (
                                        <div key={index} className="mt-2 p-2 rounded-lg bg-gray-800 shadow-sm">
                                            <span className="font-bold">{msg.sender}</span>
                                            <p className="mt-1">{msg.content}</p>
                                            <span className="text-sm">{msg.timestamp}</span>
                                        </div>
                                    ))}
                                    <div ref={messageEndRef} />
                                </div>
                                <div className="p-4 bg-gray-800">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        className="bg-gray-700 p-2 rounded-lg w-full"
                                    />
                                    <button onClick={sendMessage} className="bg-green-500 p-2 rounded-lg mt-2 shadow-sm hover:bg-green-600 transition-colors w-full">Send</button>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-xl">Select a chat room to start messaging</p>
                            </div>
                        )}
                    </main>
                    <aside className="bg-gray-800 w-1/4 p-4">
                        <h2 className="font-bold text-xl mb-4">Participants</h2>
                        {participants.map((participant, index) => (
                            <div key={index} className="p-2 rounded-lg mb-2 bg-gray-700 shadow-sm">{participant}</div>
                        ))}
                    </aside>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Login</h2>
                        <button onClick={login} className="bg-blue-500 p-2 rounded-lg shadow-sm hover:bg-blue-600 transition-colors">Login as Sample User</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;