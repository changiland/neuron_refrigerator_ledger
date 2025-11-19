import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import IntroPhoto from '@/Images/IntrodutionPhoto.jpg';
import funcPhoto from '@/Images/functionphoto.webp';
import News from '@/Components/NewsComp';
export default function Welcome(auth) {
    return (
        <>
            <Head title="ホームページ" />
            < MainLayout auth={auth}>
                <main className="flex flex-col items-center justify-center pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto ">

                    <div className='relative bg-cover bg-center w-full h-[55vw] max-h-[45em] flex flex-col justify-end' style={{ backgroundImage: `url(${IntroPhoto})`}}>

                        <div className='absolute flex items-center justify-center w-[70%] h-[25%] bg-[rgba(1,2,32,0.59)] text-white text-[7vw] sm:text-[5vw] top-[10px] '>
                            <p>節約、簡単、未来</p>
                        </div>

                        <div className='absolute flex items-center justify-center w-[70%] h-[40%] bg-[rgba(1,2,32,0.59)] text-white text-[4vw] sm:text-[3vw] bottom-[10px] right-0'>
                            <p>
                                貯金節約の新たな生活を作る<br></br>
                                一目で簡単に確認できる機能<br></br>
                                緑の循環にする環境の守り
                            </p>
                        </div>

                    </div>

                    <div className=" text-3xl font-bold text-gray-800 w-[80%] h-[10vw] text-center ">
                        <button className='shadow-xl w-[80%] h-full bg-white rounded-[20px] text-[7vw] sm:text-[5vw]'><Link href={route('register')}>すぐに始める!</Link></button>
                    </div>

                    <div className='relative bg-cover bg-center w-full h-[55vw] max-h-[45em] flex flex-col justify-end' style={{ backgroundImage: `url(${funcPhoto})`}}>

                        <div className='absolute flex items-center justify-center md:w-[19vw] md:h-[19vw] w-[25vw] h-[25vw] bg-[rgba(1,2,32,0.59)] text-white text-[6vw] sm:text-[3vw] top-0 right-0 '>
                            <p>在庫食材</p>
                        </div>

                        <div className='absolute flex items-center justify-center md:w-[19vw] md:h-[19vw] w-[25vw] h-[25vw] bg-[rgba(1,2,32,0.59)] text-white text-[6vw] sm:text-[3vw] top-[26vw] md:top-[19.1vw] right-0'>
                            <p>入荷履歴</p>
                        </div>

                        <div className='absolute flex items-center justify-center md:w-[19vw] md:h-[19vw] w-[25vw] h-[25vw] bg-[rgba(1,2,32,0.59)] text-white text-[6vw] sm:text-[3vw] top-0 right-[26vw]  md:right-[19.1vw]'>
                            <p>当月支払</p>
                        </div>
                    </div>

                    <div className=" text-3xl font-bold text-gray-800 w-[80%] h-[10vw] text-center ">
                        <button className='shadow-xl w-[80%] h-full bg-white rounded-[20px] text-[7vw] sm:text-[5vw]'><Link href={route('QandA')}>問い合わせ</Link></button>
                    </div>

                    <News/>
                </main>
            </MainLayout>
        </>


    );
}
