'use client'
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import React, {useState} from 'react'
import { FontAwesomeIcon } from 'react-typed';

interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]

}

export default function Home() {
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  //생년월일이 숫자같지만 문자열로 전송되기때문에 STRING
  const [month, setMonth] = useState<string>("1");
  const [time, setTime] = useState<string>("");
  // 기본값이 모름이니깐 비워둠
  const [resulttoday, setResultToday] = useState<today|null>(null);
  const [resultTomorrow, setResultTomorrow] = useState(null);
  const [resultMonth, setResultMonth] = useState(null);
  const menuType = ["총운","애정운","재물운","직장운","학업.시험운","행운사항"];
  const [isActive, setIsActive] = useState<number>(0);
  const [cateGory, setCateGory] = useState<string>("총운");
  const fetchData = async ()=>{
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`);
    const data = await res.json();
    setResultToday(data.result.day)
    setResultTomorrow(data.result.tomorrow)
    setResultMonth(data.result.month)
    // console.log(data.result.day)
    // console.log(data.result.tomorrow)
    // console.log(data.result.month)
  }
  //마스킹이래여 위에꺼

  const birthChange= ((e: React.ChangeEvent<HTMLInputElement>)=>{
    // 인풋의 값을 그대로 가져오는 방법임
    const value = e.target.value;
    if(value.length <=10 && /^[0-9]*$/.test(value)){
      setBirthDate(value)
    }
    // 4자리-붙이는거 해보기(정규식임)
    // if (value.length <=8 && /^19[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
    //   setBirthDate(value);
    // }
  })

  console.log(resulttoday)

  return (
    <>
      <div className='w-full h-full'>
        <p className='text-center text-2xl my-4 font-bold'>🌷오늘의 운세🌷</p>
        <div className='w-4/5 h-4/5 mx-auto border'>
          <div className='flex justify-center my-3 mx-2'>
            <span className='basis-1/2 text-center'>성별 </span>
            <button className={`border basis-1/2 ${gender === 'm' ? 'bg-pink-300': "bg-white"}`}  onClick={()=>setGender("m")}>남자</button>
            <button className={`border basis-1/2 ${gender === 'f' ? 'bg-pink-300': "bg-white"}`} onClick={()=>setGender("f")}>여자</button>
          </div>
          <div className='flex justify-between my-3 mx-2'>
            <span className='basis-1/3 text-center'>생년월일</span>
            <input type='text' onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)' className="border basis-2/3 text-center"/>
          </div>
          <div className='flex justify-center my-3 mx-2'>
            <span className='basis-1/3 text-center'>달</span>
            <select value={month} onChange={(e)=>setMonth(e.target.value)} className="border basis-2/3 text-center">
              <option value="1">양력</option>
              <option value="2">음력 평달</option>
              <option value="3">음력 윤달</option>
            </select>
          </div>
          <div className='flex justify-center my-3 mx-2'>
            <span className='basis-1/3 text-center'>시간</span>
            <select value={time} onChange={(e)=>setTime(e.target.value)} className="border basis-2/3 text-center">
              <option value="">모름</option>
              <option value="0">23:30~01:29</option>
              <option value="1">01:30~03:29</option>
              <option value="2">03:30~05:29</option>
              <option value="3">05:30~07:29</option>
              <option value="4">07:30~09:29</option>
              <option value="5">09:30~11:29</option>
              <option value="6">11:30~13:29</option>
              <option value="7">13:30~15:29</option>
              <option value="8">15:30~17:29</option>
              <option value="9">17:30~19:29</option>
              <option value="10">19:30~21:29</option>
              <option value="11">21:30~23:29</option>
            </select>
          </div>
          <button className='block px-5 py-2 rounded-md my-3 shadow-sm bg-pink-400 text-white mx-auto' onClick={fetchData}>확인</button>
          {/* {resultData && resultData.day.title} */}
          {resulttoday && 
            (
              <>
                <h2 className='text-center font-bold h-10 leading-10'>{resulttoday.title}</h2>
                <p className='text-lg'>
                  <FontAwesomeIcon icon={faCalendar} className='mr-1'/>{resulttoday.date}
                </p>
                <div className='flex-col justify-around basis-5/6'>
                  {resulttoday.content.map((item, idx) => (
                    <div key={idx} onClick={()=>{setIsActive(idx); setCateGory(menuType[idx])}} className={`${isActive === idx ? "bg-pink-200 font-bold cursor-pointer text-center" : "bg-white border cursor-pointer  text-center"}`}>{item.name}
                     {/* <span>{item.desc}</span> */}
                     {isActive === idx && <div className='basis-full bg-white py-3 text-center px-3'>🔑 {item.desc}</div>}
                     </div>
                  ))}
                </div>
                <div className="">
                </div>
              </>
          )}
        </div>
      </div>
    </>
     )
}
