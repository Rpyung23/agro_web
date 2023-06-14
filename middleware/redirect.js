

export default function ({ app, route, redirect, store }) 
{

    if(route.name == "index")
    {
        redirect('/0604666982001')
    }

    /*var cookie = app.$cookies.get("token")

    console.log("cokie -> " + cookie)
    console.log(route.name)
    //console.log("auth -> " + store.state.auth.token)

    if (route.name == "empresa-subempresa") 
    {
        if (cookie != "" || cookie != null || cookie != undefined) 
        {
            redirect('../monitoreo')
        } 
    }else if(route.name == "index")
    {
        redirect('/empresa/subempresa')
    }*/
}