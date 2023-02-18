//看最後export default(輸出)的元件檔名建立css檔案
import InsideStyles from '@/styles/Inside.module.css'

//如果有用到hook都要載入
import {useState} from 'react'

//建立button元件
const Button = () => {
  return(
    <button>Click</button>
  )
}

//建立page元件，先放參數進來，要用的時候再帶入參數

const Page = ({ data, className }) => {
  return (
    <>
      {data.abilities.map((ability, index) => (
        <div key={index} className={className}>{ability.ability.name}</div>
      ))}
    </>
  );
}

// 看這頁 https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
  const data = await res.json()
  console.log(data);
  return { props: { data } }
}


// 輸出元件 Inside(css檔名就是這個)

export default function Inside({data}) {
  //設置預設的state(狀態)，以及要改變的狀態
  const [isActive, setIsActive] = useState(false);

  //設定事件
  const handleButtonClick = () => {
    //set 設定 is 是 active (如果不是active) toggle的意思
    setIsActive(!isActive);
  }
  return (
    <>
      {/* 帶入參數，綁定事件 */}
      <div className={InsideStyles.buttons} onClick={handleButtonClick}>點我</div>

      {/* className 預設是test 點了之後是 test active 被setIsActive了 */}
      <Page data={data} className={`${InsideStyles.test} ${isActive ? InsideStyles.active : ''}`} />
    </>
    
  )
}
