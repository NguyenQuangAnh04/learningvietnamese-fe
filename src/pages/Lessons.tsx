import DailyCheckIn from '../component/DailyCheckIn'
import LessonCard from '../component/LessonCard'
import Header from '../component/common/Header'

export default function Lessons() {
  return (
    <div className='bg-[#141f25]'>
      <Header />
      <DailyCheckIn/>
      <LessonCard />
      {/* <Footer/> */}
    </div>
  )
}
