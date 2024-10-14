import './Home.css';
// import welcome from 'public/welcome.jpg';

function Home() {

    return (
        <div className="Home">
            <div >Welcome to SOA Lab#2</div>
            <img style={{padding: '20px'}} src={'/welcome.jpg'} />
        </div>
    );
}

// faculty -> discipline -> labwork

export default Home;
