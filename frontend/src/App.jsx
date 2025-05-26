import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import VideoVerifier from './components/VideoVerifier'


export default function App() {
  return (
    <div className="min-h-screen w-full bg-purple-500 flex flex-col gap-5 p-8">
      {/* <div className='self-start'>
        <ShieldCheckIcon className="h-24 w-24 text-white mx-auto" />
      </div> */}
      {/* <div className="text-center">  */}
        {/* <h1 className=" w-fit self-center transform rounded-lg text-7xl font-bold text-white  [text-shadow:_0_0_2px_#000,_0_0_2px_#000,_0_0_2px_#000]">
          Video Guardian
        </h1>
        <p className="text-white text-2xl text-center">
          Blockchain Verification System
        </p> */}
        
        <VideoVerifier/>
       {/* </div> */}
    </div>
  )
}