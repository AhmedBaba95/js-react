function createElement(type, props, ...children) {
    return {
         type,
         props: {
              ...props,
             children: children.flatMap(child => {
                if (typeof child === 'string' || typeof child === 'number') {
                    return child;
                }
                if (Array.isArray(child)) {
                     return child.map(c =>
                         typeof c === 'object' ? c : c
                    );
                }
            }),
        },
        // toString: function() {
        //     return `{"type": '${this.type}',\n "props": ${JSON.stringify(this.props, null, 2)}}`;
        // },
    };
}

let a = createElement("div");
let b = createElement("div", { id: "home" }, "a");
let c = createElement("div", null, 1, "B");
 
// console.log(a.toString());
// console.log(b.toString());
// console.log(c.toString());

