# Publicis Sapient Assignment
This project is build on Angular 10. The projected is hosted on [Heroku](https://demo-ps-rahul.herokuapp.com/). To achieve the design resposiveness I used flexbox layout combined with media queries.

## Approach
Though a fairly simple requirement, the project involve various concepts of Angular. The code is written with strict adherence to the **DRY principle**  as well as making maximum use of **Dependency Inversion Control**.

1. I created 2 modules (**Home Module** and **Shared Module**). **Home Module** is being lazy loaded in the **app.routing.module** 
2. To convert the application into server side rendering application I used the command **ng add @nguniversal/express-engine**
3. I also made the application a PWA. For this I used the command **ng add @angular/pwa**
4. In the Shared Module, I created a reusable **Card Component**, whose only task is to dynamically project **Filter Component** or the **Main Component**. For dynamic projection I used the concept of ng-template** and the ngTemplateOutlet directive.
5. Also in the Shared Module, I created a reusable http client wrapper service for **HttpClientWrapperService** with some functions which helps to prevent repeated code wriiten during calling a backend API
6. There is model folder which contains Interfaces to be implemented by each Service as well as dataTypes of custom variables. Creating models helps with strong typing of the Application (reduces errors in the application) and also with Dependency Inversion Control
7. **app.constants** is a module responsible for serving constants throughout the application with the help of Injection tokens.
8. The flow of the application is straightforward. When any filter is clicked, the respective data is emitted out from the filter component and it is recieved by the home component. The Home component makes a backend call with the url parameters and after recieving the data it is input to the card component which in turn injects the data into the main coponent.
