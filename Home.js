import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Catalago from './components/Catalago';
import Pedido from './components/Pedidos';
import HomePage from './components/HomePage'
import Cliente from './components/Clientes';
import FinalizaServico from './components/FinalizaPedido';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Home = (navigate) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: ()=> <FontAwesome color="#03a9f4" size={22}  name='home' /> , unfocusedIcon: ()=> <FontAwesome color="#03a9f4" size={22}  name='home' /> },
    { key: 'catalago', title: 'Catalago', focusedIcon: ()=> <FontAwesome color="#03a9f4" size={22}  name='cart-plus' />   },
    { key: 'pedidos', title: 'Pedidos', focusedIcon: ()=> <FontAwesome color="#03a9f4" size={22}  name='list-ul' />  },
    { key: 'recentes', title: 'recentes', focusedIcon: ()=> <FontAwesome color="#03a9f4" size={22}  name='history' />},
    { key: 'user', title: 'Perfil', focusedIcon: ()=> <FontAwesome color="#03a9f4" size={22}  name='user' />},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePage,
    pedidos: Pedido,
    catalago: Catalago,
    user : Cliente,
    recentes: FinalizaServico
  });

  return (
    <BottomNavigation barStyle={{ backgroundColor: '#ffffff', color: "#ffffff",  }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;