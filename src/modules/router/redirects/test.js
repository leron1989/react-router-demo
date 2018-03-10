const fn = (...rest) => {
    console.log(rest)
    console.log(typeof(rest))
    console.log(...rest)
    // console.log(typeof(...rest))
    console.log({...rest})
    console.log(typeof({...rest}))
    
}

fn('a','b','c')
fn({a:'111'}, {c:'333'})