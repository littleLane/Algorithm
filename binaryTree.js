(function(){
    var BinaryTree = function(){

        //二叉树节点对象
        var BinaryNode = function(value){
            this.value = value;
            this.left = null;
            this.right = null;
        }

        //二叉树根节点
        this.root = null;

        //插入节点
        this.insert = function(value){
            var newNode = new BinaryNode(value);

            if(this.root === null){
                this.root = newNode;
            }else{
                this.insertNode(this.root, newNode)
            }
        }

        this.insertNode = function(node, newNode){
            if(newNode.value < node.value){
                if(node.left){
                    this.insertNode(node.left, newNode);
                }else{
                    node.left = newNode;
                }
            }else{
                if(node.right){
                    this.insertNode(node.right, newNode);
                }else{
                    node.right = newNode;
                }
            }
        }

        //中序遍历
        this.middleMethod = function(callback){
            this.middleMethodNode(this.root, callback);
        }

        this.middleMethodNode = function(node, callback){
            if(node){
                this.middleMethodNode(node.left, callback);
                callback(node.value);
                this.middleMethodNode(node.right, callback);
            }
        }

        //前序遍历
        this.frontMethod = function(callback){
            this.frontMethodNode(this.root, callback);
        }

        this.frontMethodNode = function(node, callback){
            if(node){
                callback(node.value);
                this.frontMethodNode(node.left, callback);
                this.frontMethodNode(node.right, callback);
            }
        }

        //后序遍历
        this.afterMethod = function(callback){
            this.afterMethodNode(this.root, callback);
        }
        
        this.afterMethodNode = function(node, callback){
            if(node){
                this.afterMethodNode(node.left, callback);
                this.afterMethodNode(node.right, callback);
                callback(node.value);
            }
        }

        //查找最小值
        this.getMin = function(){
            this.getMinNode(this.root);
        }

        this.getMinNode = function(node){
            if(node.left){
                this.getMinNode(node.left);
            }else{
                console.log('min -> ' + node.value);
            }
        }

        //查找最大值
        this.getMax = function(){
            this.getMaxNode(this.root);
        }

        this.getMaxNode = function(node){
            if(node.right){
                this.getMaxNode(node.right);
            }else{
                console.log('max -> ' + node.value);
            }
        }

        //查找任意值
        this.getVal = function(val){
            this.getValNode(this.root, val);
        }

        this.getValNode = function(node, val){
            if(node){
                if(node.value === val){
                    console.log('要查找的节点存在！');
                }else if(node.value < val){
                    this.getValNode(node.right, val);
                }else{
                    this.getValNode(node.left, val);
                }
            }else{
                console.log('要查找的节点不存在！');
            }
        }

        //删除节点
        this.remove = function(val){
            this.removeNode(this.root, val);
        }

        this.removeNode = function(node, val){
            if(node === null) return null;

            if(node.value < val){
                node.right = this.removeNode(node.right, val);
                return node;
            }else if(node.value > val){
                node.left = this.removeNode(node.left, val);
                return node;
            }else{
                if(node.left === null && node.right === null){
                    node = null;
                    return node;
                }

                if(node.right === null){
                    node = node.left;
                    return node;
                }else if(node.left === null){
                    node = node.right;
                    return node;
                }else{
                    var minNode = this.findMinNode(node.right);
                    this.remove(minNode.value);
                    node.value = minNode.value;
                }
            }
        }

        //获取指定节点右子树里面的最小节点
        this.findMinNode = function(node){
            if(node){
                while(node && node.left){
                    node = node.left;
                }

                return node;
            }

            return null;
        }
    }

    var binaryTree = new BinaryTree();
    var arr = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    arr.forEach(function(val){
        binaryTree.insert(val);
    });

    console.log(binaryTree);

    //中序遍历
    binaryTree.middleMethod(function(val){
        console.log(val)
    });

    //前序遍历
    binaryTree.frontMethod(function(val){
        console.log(val);
    });

    //后序遍历
    binaryTree.afterMethod(function(val){
        console.log(val);
    });

    //查找最小值
    binaryTree.getMin();

    //查找最大值
    binaryTree.getMax();

    //查找任意值
    binaryTree.getVal(14);

    //删除叶子节点
    // binaryTree.remove(1)

    //删除只含有一个子树的节点
    // binaryTree.remove(14);

    //删除有左右子树的节点
    binaryTree.remove(3);
})()