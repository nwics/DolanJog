import Container from "./Container"
import facebook from "../assets/icons/icons8-facebook-24.png"
import twitter from "../assets/icons/icons8-twitter-30.png"
import github from "../assets/icons/icons8-github-30.png"
import instagram from "../assets/icons/icons8-instagram-50.png"
import logo from "../assets/icons/logo.png"

const Footer = () => {
    return (
        <footer className="bg-white shadow-lg bottom-0 left-0 right-0 p-4 " >
            <Container size="lg">
                <div className="text-center font-sans text-gray-50 font-medium p-3">
                    <div className="flex justify-center">
                        <img
                        src={logo}
                        alt=""
                        width="40px"
                        height="30px" />
                        <h1 className="text-4xl text-black font-bold ml-2">
                            DolanJo
                        </h1>
                    </div>
                    <p>&copy; 2024 DolanJo&trade;. All Rights Reserved. Built With React JS, Flask And Tailwind CSS</p>
                </div>
                <div className="p-5 flex justify-center gap-10">
                    <a href="https://web.facebook.com/nabil.hihi.5?locale=id_ID">
                        <img 
                        src={facebook}
                        alt="facebook"
                        height="36"
                        width="36"
                        />
                    </a>
                    <img 
                    src={twitter}
                    alt="twitter"
                    height="36"
                    width="36"

                    />
                    <a href="https://www.instagram.com/nabilwics/">   
                        <img 
                        src={instagram}
                        alt="instagram"
                        height="36"
                        width="36"

                        />
                    </a>
                    <a href="https://github.com/nwics">
                        <img 
                        src={github}
                        alt="github"
                        height="36"
                        width="36"
                        />
                    </a>
                    
                </div>

            </Container>
            
        </footer>

    )
}

export default Footer