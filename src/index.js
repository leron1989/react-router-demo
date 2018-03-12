
import React from 'react';
import ReactDOM from 'react-dom';

import Home from './modules/Home';

import Basic from './modules/router/basic/Basic';
import UrlParam from './modules/router/param/UrlParam';
import Redirects from './modules/router/redirects/Redirects';
import CustomLink from './modules/router/link/CustomLink';
import PreventingTransition from './modules/router/preventing/PreventingTransition';
import NoMatch from './modules/router/nomatch/NoMatch';
import RecursivePaths from './modules/router/recursivepaths/RecursivePaths';
import Sidebar from './modules/router/sidebar/Sidebar';
import AnimatedTransitions from './modules/router/animatedtransitions/AnimatedTransitions';

import AntdList from './modules/antd/AntdList';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;



class App extends React.Component{

    render(){
        return(
            <BrowserRouter>
                <Layout>
                    <LeftContent />
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <HeadContent />
                        </Header>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <CenterContent />
                        </Content>
                        <Footer style={{ textAlign: 'center'}}>
                            我是一双美丽的脚
                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
            
        )
    }
};

const HeadContent = () => (
    <div>
        <h1>React 技术栈学习</h1>
    </div>
);

class LeftContent extends React.Component{

    handleClick(e){
        console.log('click ', e);
      }

    render(){
        return (
            <Sider style={{ background: '#fff' }} breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                <div className="logo">logo虽丑，不能没有</div>
                <Menu onClick={this.handleClick} defaultOpenKeys={['sub5']} mode="inline">
                    <SubMenu key="sub1" title={<span><span>ES6</span></span>}>
                        <Menu.Item key="11"><Link to="/">基本使用</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><span>Babel</span></span>}>
                        <Menu.Item key="21"><Link to="/">基本使用</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><span>webpack</span></span>}>
                        <Menu.Item key="31"><Link to="/">基本使用</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><span>React</span></span>}>
                        <Menu.Item key="41"><Link to="/">基本使用</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><span>React Router</span></span>}>
                        <Menu.Item key="51"><Link to="/basic">基本使用</Link></Menu.Item>
                        <Menu.Item key="52"><Link to="/url_param">URL参数</Link></Menu.Item>
                        <Menu.Item key="53"><Link to="/redirects">重定向（认证）</Link></Menu.Item>
                        <Menu.Item key="54"><Link to="/custom_link">自定义链接</Link></Menu.Item>
                        <Menu.Item key="55"><Link to="/preventing_transitions">阻止导航</Link></Menu.Item>
                        <Menu.Item key="56"><Link to="/no_match">未匹配（404）</Link></Menu.Item>
                        <Menu.Item key="57"><Link to="/recursive_paths">路径递归</Link></Menu.Item>
                        <Menu.Item key="58"><Link to="/sidebar">侧边栏</Link></Menu.Item>
                        <Menu.Item key="59"><Link to="/animated_transitions">过度动画</Link></Menu.Item>
                        <Menu.Item key="510"><Link to="/ambiguous_atches">模糊匹配</Link></Menu.Item>
                        <Menu.Item key="511"><Link to="/route_config">路由配置</Link></Menu.Item>
                        <Menu.Item key="512"><Link to="/modal_gallery">模态画栏</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub6" title={<span><span>Redux</span></span>}>
                        <Menu.Item key="61"><Link to="/">基本使用</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub7" title={<span><span>Ant Design</span></span>}>
                        <Menu.Item key="71"><Link to="/antd_grid">基本使用</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

const CenterContent = () => (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Route exact path="/" render={() => (
            <div><h2>默认页面</h2></div>
        )}/>
        <Route path="/basic" component={Basic} />
        <Route path="/url_param" component={UrlParam} />
        <Route path="/redirects" component={Redirects} />
        <Route path="/custom_link" component={CustomLink} />
        <Route path="/preventing_transitions" component={PreventingTransition} />
        <Route path="/no_match" component={NoMatch} />
        <Route path="/recursive_paths" component={RecursivePaths} />
        <Route path="/sidebar" component={Sidebar} />
        <Route path="/animated_transitions" component={AnimatedTransitions} />
        <Route path="/ambiguous_atches" component={Home} />
        <Route path="/route_config" component={Home} />
        <Route path="/modal_gallery" component={Home} />


        <Route path="/antd_grid" component={AntdList} />
    </div>
)

ReactDOM.render(
	<App />,
    document.getElementById('app')
);