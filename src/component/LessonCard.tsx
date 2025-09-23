import { faBookOpen, faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LessonDTO } from '../types/Lession';

interface LessonItem extends LessonDTO {
  completed?: boolean;
  progress?: number;
}

export default function LessonCard() {
  const lessons: LessonItem[] = [
    { id: 1, title: "Basic Greetings", describe: "Learn essential greetings and polite expressions", time: "15 min", level: "beginner", completed: true, progress: 100 },
    { id: 2, title: "Family Members", describe: "Vocabulary for family relationships", time: "20 min", level: "beginner", completed: true, progress: 100 },
    { id: 3, title: "Food & Drinks", describe: "Common food and beverage vocabulary", time: "25 min", level: "beginner", completed: true, progress: 100 },
    { id: 4, title: "Daily Routines", describe: "Expressing daily activities and schedules", time: "30 min", level: "intermediate", progress: 40 },
    { id: 5, title: "Past Tense Verbs", describe: "Understanding and using past tense", time: "35 min", level: "intermediate", progress: 32 },
    { id: 6, title: "Business Communication", describe: "Professional language for workplace", time: "40 min", level: "advanced", progress: 2 }
  ];


  const navigate = useNavigate();


  const badgeClass = (level: string) =>
    ({
      beginner: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
      intermediate: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',
      advanced: 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
    } as Record<string, string>)[level] || 'bg-gray-500/20 text-gray-400 border border-gray-500/40';

  return (
    <div className="max-w-[1250px] mx-auto py-6 px-2 text-white min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[26px] font-semibold">Lessons</h1>
            <p className="text-gray-400 text-sm">Choose a lesson to start learning</p>
          </div>

        </div>

        <div className="flex gap-3">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              placeholder="Search lessons..."
              className="w-full bg-[#2a3b45] text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="relative w-40">
            <select
              className="w-full appearance-none bg-[#2a3b45] text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map(lesson => (
            <div
              key={lesson.id}
              className="flex flex-col border border-white/10 rounded-xl p-5 bg-[#1c2a32] hover:shadow-xl hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-[15px] leading-snug">{lesson.title}</h3>
                <div className='w-12 h-12'>
                  <svg style={{ height: 0 }}>
                    <defs>
                      <linearGradient id="gradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Progress
                    type="circle"
                    percent={lesson.progress}
                    size={35}
                    strokeColor="#1677ff"
                    format={(percent) => (
                      <span style={{ color: "white" }}>{percent}%</span>
                    )}
                  />

                </div>
              </div>

              <p className="text-[13px] text-gray-300 mt-2 leading-snug line-clamp-3">
                {lesson.describe}
              </p>

              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <span className={`text-[11px] px-2 py-[3px] rounded-md font-medium capitalize ${badgeClass(lesson.level)}`}>
                  {lesson.level}
                </span>
                <span className="text-[12px] text-gray-400 flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} /> {lesson.time}
                </span>
              </div>

              <div className="mt-5">
                <button
                  className="w-full text-[13px] font-medium rounded-md flex items-center justify-center gap-3 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-md"
                >
                  <FontAwesomeIcon icon={faBookOpen} className="text-[12px]" />
                  <span>Review Lesson</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
