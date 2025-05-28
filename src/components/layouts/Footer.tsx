import React from 'react'
import logo from '../../Assets/Images/logowhite.svg';
const Footer = () => {
    return (
        <div>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <div className="logo-foot">

                                <div className="w-[124.15px] pb-[3.18px] left-[68.57px] top-[16.40px] absolute border-b-[0.80px] border-white/60 inline-flex flex-col justify-start items-start">
                                    <img src={logo.src} alt="Footer Logo" style={{width:'215px'}} />
                                    {/* <div className="self-stretch justify-start text-white text-4xl font-bold font-['Traditional_Arabic'] leading-9">RAZVI</div>
                                    <div className="self-stretch opacity-80 justify-start text-white text-[10.35px] font-bold font-['Traditional_Arabic'] leading-[10.35px] tracking-tight">DARUL IFTA BAREILLY</div> */}
                                </div>


                                <p>Razvi Darul lfta, Dargah e Aalahazrat <br></br>
                                    Saudagran, Bareilly, India, 243001
                                </p>
                                {/* <a href="#" className="btn btn-block btn-donate">Donate Our Trust</a> */}
                            </div>
                        </div>
                        <div className="col-6 col-lg-2">
                            <div className="foot-nav">
                                <h2>SITEMAP</h2>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/Fatawa">Fatawa</a></li>
                                    <li><a href="/Book">Books</a></li>
                                    <li><a href="/Articals">Articles</a></li>
                                    {/* <li><a href="#">Our Trust</a></li> */}
                                    <li><a href="/About">About us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-6 col-lg-2">
                            <div className="foot-nav">
                                <h2>HOME</h2>
                                <ul>
                                    <li><a href="/Fatawa">Fatawa</a></li>
                                    <li><a href="/Book">Books</a></li>
                                    <li><a href="#">Articles</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="foot-address">
                                <h2>HEAD OFFICE</h2>
                                <address>
                                    Razvi Darul lfta, Dargah e Aalahazrat
                                    Saudagran, Bareilly, India, 243001
                                </address>
                                <h3>razvidarulifta@gmail.com</h3>
                            </div>
                            <div className="social-icons">
                                <h3>Socials</h3>
                                <ul>
                                    <li><a target="_blank" href="#"><i className="fa fa-google">&nbsp;</i></a></li>
                                    <li><a target="_blank" href="#"><i className="fa fa-facebook">&nbsp;</i></a></li>
                                    <li><a target="_blank" href="#"><i className="fa fa-whatsapp">&nbsp;</i></a></li>
                                    <li><a target="_blank" href="#"><i className="fa fa-instagram">&nbsp;</i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-12">
                            <div className="copyright text-center">
                                <p>&copy;2024 Razvi Darul lfta. All rights reserved.</p>
                                <p>No copying allowed. Disclaimer:Content for informational purposes only</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
