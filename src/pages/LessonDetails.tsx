import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../component/common/Header';
import { getLessonByTitle } from '../service/lessonService';
import { LessonDTO } from '../types/Lession';

export default function LessonDetails() {
  const [actions, setActions] = useState('Content');
  const [lessonDetails, setLessonDetails] = useState<LessonDTO>();
  const { title } = useParams();
  useEffect(() => {
    if (!title) return; // kiểm tra điều kiện bên trong
    const fetchData = async () => {
      const res = await getLessonByTitle(title);
      setLessonDetails(res.data);
    };
    fetchData();
  }, [title]);
  const navigate = useNavigate();
  console.log(lessonDetails);
  if (!title) return <div>Loading...</div>;
  return (
    <>
      <Header />
      <div className='bg-[#141f25] min-h-screen text-white'>
        {lessonDetails && (
          <div className='max-w-[1200px] mx-auto w-full  px-4 py-4'>
            <div className='flex gap-3 items-center'>
              <button onClick={() => navigate("/")}><FontAwesomeIcon icon={faArrowLeft} /></button>
              <span>Back to Lessons</span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-5 gap-8 '>
              <div className='sm:col-span-3 lg:col-span-3'>
                <h1 className='font-semibold text-2xl mt-4'>{lessonDetails.title}</h1>
                <p className=' text-gray-500 line-clamp-3 sm:line-clamp-none'>{lessonDetails.describe}</p>
                <p><FontAwesomeIcon icon={faClock} />15 minutes</p>
                <div>
                  <div className='sm:col-span-3 lg:col-span-2'>
                    {/* Tabs */}
                    <div className='flex gap-4 border-b border-gray-600 py-4 mb-6'>
                      <button onClick={() => setActions("Content")} className={`pb-2 ${actions === "Content" ? "text-orange-400 transition-all border-b-2 border-orange-500" : "text-gray-400 hover:text-white"}`}>Content</button>
                      <button onClick={() => setActions("Vocabulary")} className={`pb-2 ${actions === "Vocabulary" ? "text-orange-400 transition-all border-b-2 border-orange-500" : "text-gray-400 hover:text-white"}`}>Vocabulary</button>
                    </div>

                    {/* Nội dung tabs */}
                    {actions === "Content" && (
                      <div className='space-y-6'>
                        <div>
                          <h2 className='text-xl font-bold mb-3'># Basic Greetings</h2>

                          <div className='mb-6'>
                            <h3 className='text-lg font-semibold text-gray-300 mb-3'>## Introduction</h3>
                            <p className='text-gray-300 leading-relaxed'>
                              {lessonDetails.content}
                            </p>
                          </div>

                          <div className='mb-6'>
                            <h3 className='text-lg font-semibold text-gray-300 mb-3'>## Common Greetings</h3>
                            <div className='space-y-3 text-gray-300'>
                              {lessonDetails.vocabularies.map(item => (
                                <div className='bg-[#1b262c] p-4 rounded-lg'>
                                  <p>- <strong className='text-white'>"{item.word}"</strong> - {item.meaning}</p>
                                </div>
                              ))}
                              {/* <div className='bg-[#1b262c] p-4 rounded-lg'>
                                <p>- <strong className='text-white'>"Chào buổi sáng"</strong> - Used from dawn until noon</p>
                              </div>
                              <div className='bg-[#1b262c] p-4 rounded-lg'>
                                <p>- <strong className='text-white'>"Chào buổi chiều"</strong> - Used from noon until evening</p>
                              </div>
                              <div className='bg-[#1b262c] p-4 rounded-lg'>
                                <p>- <strong className='text-white'>"Chào buổi tối"</strong> - Used from evening until bedtime</p>
                              </div> */}
                            </div>
                          </div>
                          {/* 
                          <div>
                            <h3 className='text-lg font-semibold text-gray-300 mb-3'>## Polite Expressions</h3>
                            <div className='space-y-3 text-gray-300'>
                              <div className='bg-[#1b262c] p-4 rounded-lg'>
                                <p>- <strong className='text-white'>"Cám ơn"</strong> - Used to express gratitude</p>
                              </div>
                              <div className='bg-[#1b262c] p-4 rounded-lg'>
                                <p>- <strong className='text-white'>"Xin lỗi"</strong> - Used to get attention or apologize</p>
                              </div>
                              <div className='bg-[#1b262c] p-4 rounded-lg'>
                                <p>- <strong className='text-white'>"Không có gì"</strong> - Response to "Cám ơn"</p>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    )}

                    {actions === "Vocabulary" && (
                      <div className='space-y-4'>
                        <h2 className='text-xl font-bold mb-4'>Vocabulary List</h2>
                        <div className='grid gap-4'>
                          {lessonDetails.vocabularies.map((word, index) => (
                            <div key={index} className='bg-[#1b262c] p-2 rounded-lg border border-gray-600'>
                              <div className='flex justify-between items-start mb-2'>
                                <h4 className='text-lg font-semibold text-white'>{word.word}</h4>
                                <button className='text-blue-400 hover:text-blue-300'>
                                  🔊
                                </button>
                              </div>
                              <p className='text-gray-300 mb-1'><strong>English:</strong> {word.meaning}</p>
                              <p className='text-gray-400 italic'><strong>Pronunciation:</strong> {word.pronunciation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='lg:col-span-2'>
                <div className='bg-[#1b262c] rounded-lg border border-gray-600 p-6 mb-6'>
                  <h3 className='text-lg font-semibold mb-4'>Learning Options</h3>
                  <div className='space-y-3'>
                    <button onClick={() => navigate(`/lessons-video/${lessonDetails.title.toLowerCase().replace(/\s+/g, '-')}`)} className='w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center'>
                      <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' clipRule='evenodd' />
                      </svg>
                      Watch Video Lesson
                    </button>
                    <button className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center'>
                      <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z' clipRule='evenodd' />
                      </svg>
                      Practice Games
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className='bg-[#1b262c] rounded-lg border border-gray-600 p-6'>
                  <h3 className='text-lg font-semibold mb-4'>Quick Stats</h3>
                  <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-400'>Vocabulary Words</span>
                      <span className='font-semibold text-white'>8</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-400'>Estimated Time</span>
                      <span className='font-semibold text-white'>15 min</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-400'>Difficulty</span>
                      <span className='font-semibold text-white'>Beginner</span>
                    </div>
                    {/* <div className='flex justify-between items-center'>
                      <span className='text-gray-400'>Progress</span>
                      <div className='flex items-center'>
                        <div className='w-16 h-2 bg-gray-600 rounded-full mr-2'>
                          <div className='w-full h-2 bg-green-500 rounded-full'></div>
                        </div>
                        <span className='font-semibold text-green-400'>100%</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Achievement Badge */}
                {/* <div className='bg-[#1b262c] rounded-lg border border-gray-600 p-6 mt-6 text-center'>
                  <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3'>
                    <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <h4 className='font-semibold text-green-400 mb-1'>Lesson Completed!</h4>
                  <p className='text-gray-400 text-sm'>Great job on finishing this lesson</p>
                </div> */}
              </div>
              {/* Cột trái - Nội dung bài học */}



            </div>
          </div>
        )}
      </div>
    </>
  )
}
