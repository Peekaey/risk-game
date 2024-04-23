import React from "react"


// State Parameters
interface HomePageProps {
    renderHomeScreen: (value: boolean) => void
    renderGameSettingsScreen: (value: boolean) => void
}
export const HomePage: React.FC<HomePageProps> = ({renderHomeScreen, renderGameSettingsScreen}) => {
  return (
      <React.Fragment>
          <h1>Welcome to Risk</h1>
            <h2>The strategy game of diplomacy, conflict and conquest for 2 to six players</h2>
                <div className="card">
                <button className="get-started-button" onClick={() => HandleGetStartedButton(renderHomeScreen, renderGameSettingsScreen)} > Get Started </button>
                </div>
      </React.Fragment>
  )
}


const HandleGetStartedButton = (renderHomeScreen: (value:boolean) => void, renderGameSettingScreen: (value:boolean) => void)=> {

 renderGameSettingScreen(true)
    renderHomeScreen(false)
    console.log("Get Started button clicked")
}