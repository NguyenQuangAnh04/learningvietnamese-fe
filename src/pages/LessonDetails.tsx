import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LessionDetails() {
  const badgeClass = (level: string) => ({
    beginner: 'bg-emerald-100 text-emerald-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-rose-100 text-rose-700'
  } as Record<string, string>)[level] || 'bg-gray-100 text-gray-700';
  return (
    <div className='max-w-[1200px] mx-auto pt-5'>
      <button className='flex gap-2 items-center'><span><FontAwesomeIcon icon={faArrowLeft} /></span><span className='text-sm'>Back to lessons</span></button>
      <section className='mt-5'>
        <div>
          <h1 className='text-2xl font-semibold'>Basic Greetings</h1>
          <p>Learn essential greetings and polite expressions for everyday conversations</p>
          <div className='flex gap-5 text-sm items-center'>
            <span className={`text-[11px] px-2 py-[2px] font-medium rounded-md capitalize ${badgeClass("beginner")} `}>Beginner</span>
            <span><span><FontAwesomeIcon icon={faClockFour}  /></span>15 minutues</span>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  )
}
