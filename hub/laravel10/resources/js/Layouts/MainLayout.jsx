import {Link} from '@inertiajs/react';
import Backerground from '../Components/Background';
import Header from '../Components/Header';
import Footer from '../Components/Footer';



export default function MainLayout({children, auth}) {
    return (
        <>
            {/* Main Layout */}
            <Backerground>
                <Header auth={auth} />
                    {children}
                <Footer />
            </Backerground>
        </>
    );
}
