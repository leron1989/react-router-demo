* 初始化：npm init -y
* 安装webpack:
    1. npm install --save-dev webpack
    2. npm install -save-dev webpack-cli
        >webpack 4 新增, webpack把相关命令移到了webpack-cli
    3. 新增webpack.config.js:
    ```javascript
        var path = require('path');
        /**
         * webpack 4 默认入口为：./src/index.js
         * 默认生成文件：./dist/main.js
         */
        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist')
            }
        }
    ```

    >**注意**

    >直接运行npx webpack打包命令会报两个错误：<br>
    >1. WARNING in configuration The 'mode' option has not been set. Set 'mode' option to 'development' or 'production' to enable defaults for this environment.<br>
    >2. ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/sam/tmp/webpack-demo'<br>
    >问题一：未设定 mode，这是 webpack 4 引入的，有俩种模式，development 与 production，默认为 production - 其实还有一个隐藏的 none 模式，回到 webpack 4 以前的时代。<br>
    >问题二：入口模块不存在 - webpack 4 默认从项目根目录下的 ./src/index.js 中加载入口模块，所以我们或者新建一个 src/index.js 文件，或者指定一个入口文件。<br>
    4. 安装webpack-dev-server
    ```javascript
        cnpm install --save-dev webpack-dev-server
    ```
    >**注意**
    
    >webpack-dev-server 已经进入维护模式,建议使用webpack-serve 全新的 webpack 开发服务器，webpack-dev-server 的继任者。<br>
    >在webpack 4下使用使用使用webpack-dev-server必须安装支持 webpack 4 的 webpack-dev-server 3 版本，否则可能出现如下错误：<br>
    >Cannot find module 'webpack/bin/config-yargs'<br>

    >webpack-dev-server 未刷新页面这个问题不注意的话很容易发生，所以单独提取出来说一下。<br>
    >我们看前面 npx webpack-dev-server --mode development 的输出里有这么一行：<br>
    >webpack output is served from /<br>
    >是了，webpack-dev-server 构建的 main.js 其实是在 http://localhost:8080/main.js 的位置，而不是 http://localhost:8080/dist/main.js，而且，它存在于内存中，并不写入磁盘。而我们在 index.html 页面中引用的是 dist/main.js。<br>
    >我们可以在运行 webpack-dev-server 时指定 output.publicPath：<br>
    >$ npx webpack serve --mode development --output-public-path dist<br>

* 安装react:npm install --save react react-dom

* 安装babel
    1. 根目录新建.babelrc文件：
    ```javascript
        {
            "presets":[
                "es2015",
                "react"
            ],
            "plugins":[]
        }
    ```
    2. 安装babel相关：
    cnpm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

    3. 修改webpack.config.js
    ```javascript
        var path = require('path');

        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist')
            },
            module: {
                rules:[
                    {
                        test:/\.js$/,
                        exclude: /node_modules/,
                        loaders: 'babel-loader',
                        query: {
                            presets:['es2015', 'react']
                        }
                    }
                ]
            }
        }
    ```
* webpack加载css
    1. 安装
    npm install --save-dev style-loader css-loader

    2. 配置
    ```javascript
        {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
        }
    ```
* webpack 加载图片
    1. 安装
    npm install --save-dev file-loader
    2. 配置
    ```javascript
        {
            test:/\.(png|svg|jpg|gif)$/,
            use:[
                'file-loader'
            ]
        }
    ```
* webpack加载字体
    1. 安装
        >同加载图片
    2. 配置
    ```javascript
        {
            test:/\.(woff|woff2|eot|ttf|otf)$/,
            use:[
                'file-loader'
            ]
        }
    ```
* webpack加载资源
    1. 安装
    npm install --save-dev csv-loader xml-loader
    2. 配置
    ```javascript
        {
            test:/\.(csv|tsv)$/,
            use:[
                'csc-loader'
            ]
        },
        {
            test:/\.xml$/,
            use:[
                'xml-loader'
            ]
        }
    ```

* 使用HtmlWebpackPlugin自动生成index.html文件
    1. 安装
    npm install --save-dev html-webpack-plugin
    2. 配置
    ```javascript
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        plugins:[
            new HtmlWebpackPlugin({
                title: 'react router demo'
            })
        ],
    ```
* 清理/dist
    1. 安装
    npm install clean-webpack-plugin --save-dev
    2. 配置
    ```javascript
        const CleanWebpackPlugin = require('clean-webpack-plugin');
        plugins:[
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'react router demo'
            })
        ],
    ```
* source map 错误追踪
    1. 配置
    ```javascript
        devtool: 'inline-source-map',
    ```


* react router 4.0前后路由对比

    1. 4.0之前版本
    >4.0前版本的react router中，嵌套的路由可以放在一个router标签中，形式如下,嵌套的路由也直接放在一起。
    ```javascript
        <Route component={App}>
            <Route path="groups" components={Groups} />
            <Route path="users" components={Users}>
                <Route path="users/:userId" component={Profile} />
            </Route>
        </Route>
    ```


    2. 4.0之后版本
    >在4.0以后，嵌套的路由与之前的就完全不同了，需要单独放置在嵌套的根component中去处理路由，否则会一直有warning:
    >You should not use <Route component> and <Route children> in the same route

    >正确形式如下
    ```javascript
        <Route component={App}>
            <Route path="groups" components={Groups} />
            <Route path="users" components={Users}>
            /*<Route path="users/:userId" component={Profile} />*/
            </Route>
        </Route>
    ```

    >4.0之后版本中，react router完整的嵌套路由的例子如下：


    

    ```javascript
        /**
         * 以下代码采用ES6格式
         * react-router-dom版本为4.1.1
         * 请注意使用诸如HashRouter之类的history，否则一直会有warning，不能渲染 
         */
        import React, { Component } from 'react';
        import ReactDOM from 'react-dom';
        import {HashRouter, Route, Link, Switch} from 'react-router-dom';

        class App extends Component {
            render() {
                return (
                    <div>
                        <h1>App</h1>
                        <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/inbox">Inbox</Link></li>
                        </ul>
                        {this.props.children}
                    </div>
                );
            }
        }

        const About = () => (
            <div>
                <h3>About</h3>
            </div>
        )

        const Home = () => (
            <div>
                <h3>Home</h3>
            </div>
        )

        const Message = ({ match }) => (
            <div>
                <h3>new messages</h3>
                <h3>{match.params.id}</h3>
            </div>
        )

        const Inbox = ({ match }) => (
            <div>
                <h2>Topics</h2>
                <Route path={`${match.url}/messages/:id``} component={Message}/>
            </div>
        ) 

        ReactDOM.render(
            (<HashRouter>
                <App>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/inbox" component={Inbox} />
                </App>
            </HashRouter>),
            document.getElementById('root')
        );
    ```


