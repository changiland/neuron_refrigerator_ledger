import {Link} from '@inertiajs/react';
import Backerground from '../Components/Background';
import Header from '../Components/Header';
import Footer from '../Components/Footer';



export default function MainLayout({children}) {
    return (
        <>
            {/* Main Layout */}
            <Backerground>
                <Header />
                    {children}
                <Footer />
            </Backerground>
        </>
    );
}
