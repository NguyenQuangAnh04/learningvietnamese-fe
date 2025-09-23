import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Header from '../component/common/Header'
import { findAllGame } from '../service/gameService'
import { GameDTO } from '../types/Game'
import { useNavigate } from 'react-router-dom'

export default function Game() {
    const [games, setGames] = useState<GameDTO[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllGame();
            setGames(res.data)
        }
        fetchData()
    }, [])
    const navigate = useNavigate()
    return (
        <div className="bg-[#141f25] min-h-screen text-white">
            <Header />
            <div className="max-w-[1200px] mx-auto w-full mt-6 px-4">
                <div className="flex items-center space-x-3 mb-6">
                    <button className="text-gray-300 hover:text-white transition">
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold">Practice Games</h2>
                        <p className="text-sm text-gray-400">
                            Choose a game type to start practicing
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center bg-[#1b262c] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform "
                        >
                            <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
                            <p className="text-sm text-gray-400 text-center flex-1">
                                {item.description}
                            </p>
                            <button onClick={() => navigate(`/topic/${item.type}`)}
                                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                            >
                                Start Game
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
