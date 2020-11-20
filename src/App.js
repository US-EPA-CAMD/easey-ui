import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import NotFound from './components/Common/NotFound/NotFound';

import Layout from './components/Common/Layout';

function App() {
  return (
<div>
    <Layout>
    <Switch>
      <Route path="/portal" exact component={Home} />
      <Route path="/portal/home">
        <Redirect to='/portal' component={Home}/>
      </Route>
      <Route path='/portal/*' component={NotFound} />
    </Switch>
    </Layout>

    </div>
  );
}

export default App;
