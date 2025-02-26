import { NFTopia } from "../assets";
import { navigation } from "../constants"
import { useLocation } from 'react-router-dom'
import Button from "./Button"
import MenuSvg from '../assets/svg/MenuSvg'
import ButtonGradient from "../assets/svg/ButtonGradient";
import { HambugerMenu } from "./design/Header" 
import { useContext, useRef, useState } from "react";
import {disablePageScroll, enablePageScroll } from 'scroll-lock'
import { Link } from "react-router-dom";
import context from "../Context/context";

const Header = () => {
    const signInRef = useRef(null);
    const pathname = useLocation();
    const [openNavigation, setOpenNavigation] = useState(false);
    const [isSignInOpen,setIsSignInOpen] = useContext(context).signIn;
    const[isWalletConnected,setIsWalletConnected] = useContext(context).walletConnect;
    const [account,setAccount] = useContext(context).account;

    const ToggleNavigation = () => {
        if(openNavigation) {
            setOpenNavigation(false);
            enablePageScroll()
        }
        else{
            setOpenNavigation(true);
            disablePageScroll();
        }
    }

    const handleClick = () => {
        setOpenNavigation(false);
        if(!openNavigation) return;
        enablePageScroll();
        setOpenNavigation(false);
    }

    async function disconnectWallet() {
        if (window.ethereum) {
        try {
            setAccount(null);
            setIsWalletConnected(false);
        } catch (error) {
            console.error("An error occurred while disconnecting the wallet:", error);
        }
        }
    }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"} `}>
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
            <Link className="block w-[12rem] xl:mr-8" to="/">
                <img src = {NFTopia} width= {190} height = {40} alt="NFTopia" />
            </Link>

            <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>

                <div className={` ${ account || "pointer-events-none"} relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row`}> 
                    {navigation.map((item) => (
                        <Link key = {item.id} to= {item.url}  onClick={handleClick} 
                        className = {`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash ? 'z-2 lg:text-n-1' : 'lg:text-n-1/50' } lg:leading-5 lg:hover:text-n-1 xl:px-12`} 
                        >
                            {item.title}
                        </Link>
                    ))}
                </div> 
                <HambugerMenu />

            </nav>

            {   
                !isWalletConnected ?
                <Button className = "hidden lg:flex" ref={signInRef} onClick = {() => setIsSignInOpen({id:'signInPopup',open:true}) } >
                        Sign in
                </Button>

                :
                <Button white className = "hidden lg:flex" onClick = {disconnectWallet} >
                        Disconnect Wallet
                </Button>
            }
            
            <Button className = "ml-auto lg:hidden" px= "px-3" onClick = {ToggleNavigation}>
                <MenuSvg openNavigation={openNavigation} />
            </Button>
        </div>
        <ButtonGradient />
    </div>
  )
}

export default Header
