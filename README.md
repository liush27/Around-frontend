# Around-frontend
The frontend of **Geo-index based social network** uses React, bootstrapped with [**create-react-app**](https://github.com/facebook/create-react-app).<br>
(backend implementation using Golang, see [here](https://github.com/liush27/Around-backend))

# Functionalities
- **sign up**
- **login**
- **create new post**
- **search nearby post**
  * Using Ant Design tabPane to display two interfaces.
    1. Posts tab: using [**React Grid Gallery**](https://github.com/benhowell/react-grid-gallery) component to show all nearby (default 100km around) posts. See below:
    ![image](https://user-images.githubusercontent.com/38120488/38586658-97a51824-3cec-11e8-84e5-6b4edf52f3e5.png)

    2. Map tab: using [**react-google-maps**](https://github.com/tomchentw/react-google-maps) component to show nearby posts on Google Maps, we can zoom in/out to see all nearby posts. See below:
    ![image](https://user-images.githubusercontent.com/38120488/38586596-5dfbf32c-3cec-11e8-9332-08ac350b7107.png)

# References
- This app uses many [**Ant Design**](https://ant.design/docs/react/introduce) high order components, e.g. Modal, Button, Form, Input, Upload, Icon, Tabs, Spin...
- Route comes from `react-router-dom`
- [React Grid Gallery](https://github.com/benhowell/react-grid-gallery) 
- [react-google-maps](https://github.com/tomchentw/react-google-maps)
