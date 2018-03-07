
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './modules/Home';
import About from './modules/About';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class App extends React.Component{


    render(){
        return(
            <BrowserRouter>
                <div>
                    <HeadContent />
                    <LeftContent />
                    <CenterContent />
                </div>
            </BrowserRouter>
            
        )
    }
};

const HeadContent = () => (
    <div>
        <h1>React Router学习</h1>
    </div>
);

const LeftContent = () => (
    <div>
        <ol>
            <li><Link to="/basic">基本使用</Link></li>
            <li><Link to="/url_param">URL参数</Link></li>
            <li><Link to="/redirects">重定向（认证）</Link></li>
            <li><Link to="/custom_link">自定义链接</Link></li>
            <li><Link to="/preventing_transitions">阻止导航</Link></li>
            <li><Link to="/no_match">未匹配（404）</Link></li>
            <li><Link to="/recursive_paths">路径递归</Link></li>
            <li><Link to="/sidebar">侧边栏</Link></li>
            <li><Link to="/animated_transitions">过度动画</Link></li>
            <li><Link to="/ambiguous_atches">模糊匹配</Link></li>
            <li><Link to="/route_config">路由配置</Link></li>
            <li><Link to="/modal_gallery">模态画栏</Link></li>
        </ol>
    </div>
)


const CenterContent = () => (
    <div>
        <Route exact path="/" render={() => (
            <div><h2>默认页面</h2></div>
        )}/>
        <Route path="/basic" component={Home} />
        <Route path="/url_param" component={Home} />
        <Route path="/redirects" component={About} />
        <Route path="/custom_link" component={About} />
        <Route path="/preventing_transitions" component={About} />
        <Route path="/no_match" component={About} />
        <Route path="/recursive_paths" component={About} />
        <Route path="/sidebar" component={About} />
        <Route path="/animated_transitions" component={About} />
        <Route path="/ambiguous_atches" component={About} />
        <Route path="/route_config" component={About} />
        <Route path="/modal_gallery" component={About} />
    </div>
)

ReactDOM.render(
	<App />,
    document.getElementById('app')
);