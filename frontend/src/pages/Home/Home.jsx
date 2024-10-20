import React ,{useState,useEffect} from 'react';
import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import Book from '../../components/Book/Book';
import About from '../../components/About/About';
import Offers from '../../components/Offers/Offers';
import Room from '../../components/Rooms/Room';
import Fun from '../../components/Fun/Fun';
import Dine from '../../components/Dine/Dine';
import Footer from '../../components/Footer/Footer';
import Gallery from '../../components/Gallery/Gallery';
import Social from '../../components/Social/Social';
import Loader from "../../components/Loader/Loader";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (

        <div>

            <div className=""><Social /></div>
            <div id="home"><NavBar /><Book /></div>
            <div id="about"><About /></div>
            <div id="offers"><Offers /></div>
            <div id="rooms"><Room /></div>
            <div id="dine"><Dine /></div>
            <div id="fun"><Fun /></div>
            <div id="gallery"><Gallery /></div>
            <div id="footer"><Footer /></div>
        </div>
    );
}

export default Home;
