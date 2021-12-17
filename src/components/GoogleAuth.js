import React from 'react';

class GoogleAuth extends React.Component {
  /*Se necesita un state, para que cuando cambie, el componente
    se vuleva a renderizar*/
  state = { isSignedIn: null };

  componentDidMount() {
    // gapi es una variable disponible en el scope de Window
    /* El segundo argumento es un callback que será llamado cuando la
    librería termine de cargar */
    // Se carga la API:
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          //Se inicializa la API con .init
          //ClientId se obtiene de la toolbox de Google para development
          clientId:
            '349280342330-d4seea4904s9qosgjn2t6bjfivjhj482.apps.googleusercontent.com',
          scope: 'email',
          //scope: a lo que se tendrá acceso del usuario
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //Cuando se inicializa la API:
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          //To update the state on the fly, cada que este cambia:
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //Callback
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Outh
        </button>
      );
    } else {
      return (
        /* No se le ponen paréntesis al método this.onSignIn, pues se
        ejecutaria ahí mismo que se renderice el componente - comportamiento
        no deseado */
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
export default GoogleAuth;
