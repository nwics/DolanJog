import Container from "./Container"
import facebook from "../assets/icons/icons8-facebook-24.png"
import twitter from "../assets/icons/icons8-twitter-30.png"
import github from "../assets/icons/icons8-github-30.png"
import instagram from "../assets/icons/icons8-instagram-50.png"


const Footer = () => {
    return (
        <footer className="bg-white shadow-lg bottom-0 left-0 right-0 p-4 " >
            <Container size="lg">
                <div className="text-center font-sans text-gray-50 font-medium p-3">
                    <h1 className="text-4xl text-black font-bold">
                        DolanJog
                    </h1>
                    <p>&copy; 2024 DolanJo&trade;. All Rights Reserved. Built With React JS, Flask And Tailwind CSS</p>
                </div>
                <div className="p-5 flex justify-center gap-10">
                    <img 
                    src={facebook}
                    alt="facebook"
                    height="36"
                    width="36"

                    />
                    <img 
                    src={twitter}
                    alt="twitter"
                    height="36"
                    width="36"

                    />
                    <img 
                    src={instagram}
                    alt="instagram"
                    height="36"
                    width="36"

                    />
                    <img 
                    src={github}
                    alt="github"
                    height="36"
                    width="36"

                    />
                    
                </div>

            </Container>
            
        </footer>

    )
}

export default Footer