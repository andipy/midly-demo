import NavbarDefault from "../components/navbar-default.component"
import ContainerDefault from "../layout/container-default.layout"
import WidgetMetricFlashLeaderboard from "../components/widget-metric-flash-leaderboard.component"
import TextTitle from "../components/text-title.component"


const FlashLeaderboardsAdminRoute = () => {

    const numberFanFlashLeaderboards = 2400
    const streamGenerated = 4500

    const calcRatio = () => {
        const result = numberFanFlashLeaderboards / streamGenerated;
        return result
    }

    const metrics = [
        {
            id: 1,
            WidgetLabel: 'NUMERO DI FAN',
            WidgetValue: numberFanFlashLeaderboards,
    
        },{
            id: 1,
            WidgetLabel: 'STREAM GENERATI',
            WidgetValue: streamGenerated
    
        },{
            id: 1,
            WidgetLabel: 'RATIO',
            WidgetValue: calcRatio(),
    
        }
    
    ]
    
    

  return (
    <>
    <NavbarDefault />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
        <TextTitle title={'I tuoi preferiti'} />
        <p className="fsize-xs-3 f-w-300 grey-200 letter-spacing-1 mt-xs-2">
            Totali per le classifiche flash:
        </p>
        <section className="mt-xs-2 mx-xs-auto">
            {metrics?.map(metric => {
                return (
                    <WidgetMetricFlashLeaderboard WidgetLabel={metric.WidgetLabel} WidgetValue={metric.WidgetValue} key={metric.id}/>
                )
            })}

        </section>
    </ContainerDefault>
    </>
  )
}

export default FlashLeaderboardsAdminRoute