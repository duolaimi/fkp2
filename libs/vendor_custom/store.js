;
(function() {

    function getObjType(object) {
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    }

    function extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        //如果第一个值为bool值，那么就将第二个参数作为目标参数，同时目标参数从2开始计数
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }
        // 当目标参数不是object 或者不是函数的时候，设置成object类型的
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        //如果extend只有一个函数的时候，那么将跳出后面的操作
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            // 仅处理不是 null/undefined values
            if ((options = arguments[i]) != null) {
                // 扩展options对象
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // 如果目标对象和要拷贝的对象是恒相等的话，那就执行下一个循环。
                    if (target === copy) {
                        continue;
                    }
                    // 如果我们拷贝的对象是一个对象或者数组的话
                    if (deep && copy && (getObjType(copy) === 'Object' || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && getObjType(copy) === 'Object' ? src : {};
                        }
                        //不删除目标对象，将目标对象和原对象重新拷贝一份出来。
                        target[name] = extend(deep, clone, copy);
                        // 如果options[name]的不为空，那么将拷贝到目标对象上去。
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // 返回修改的目标对象
        return target;
    };

    //统计store[name]是否首次执行
    var _count = {}
    var count = function(name) {
        if (_count[name]) {
            _count[name]++;
            return true;
        } else {
            // 首次执行
            if (!_count[name]) {
                _count[name] = 1;
                return false;
            }
        }
    }

    var store = function(name, data, act) {
        this.name = name || '';
        this.sdata = data || null;
        this.sact = act||{};
        this.ctx = {"null":null};
        var me = this;

        this.dataer = function(data, key) {
            if (data) {
                this.sdata = data;
                if (getObjType(this.sact) === 'Array') {
                    var acts = this.sact;
                    var _resault = [];
                    acts.map(function(fun) {
                        if (getObjType(fun.args) === 'Array') {
                            if (count[me.name]) {
                                fun.args.pop()
                            }
                            fun.args.push(data)
                            if (typeof fun === 'function') {
                                var _tmp = fun.apply(fun.args[0], [fun.args[0], data])
                                _resault.push(_tmp);

                            }
                        } else {
                            if (typeof fun === 'function') {
                                var _tmp = fun.call(me.ctx[me.name||'null'], data);
                                _resault.push(_tmp);
                            }
                            if (getObjType(fun)=='Object') {
                              Object.keys(fun).map(function(item){
                                var _tmp = fun[item].call(me.ctx[me.name||'null'], data)
                                _resault.push(_tmp)
                              })
                            }
                        }
                    })
                    return _resault;
                }
                if (getObjType(this.sact) === 'Object') {
                    var sacts = this.sact
                    if (key) {
                        if (sacts[key]) {
                            var fun = sacts[key]
                            if (getObjType(fun.args) === 'Array') {
                                if (count[me.name]) {
                                    fun.args.pop()
                                }
                                fun.args.push(data)
                                if (typeof fun === 'function')
                                    return fun.apply(fun.args[0], [fun.args[0], data])
                            } else {
                                if (typeof fun === 'function')
                                    return fun.call(me.ctx[me.name||'null'], data);
                            }
                        }
                    } else {
                        for (var item in sacts) {
                            if (typeof sacts[item] === 'function') {
                                var fun = sacts[item]
                                if (getObjType(fun.args) === 'Array') {
                                    if (count[me.name]) {
                                        fun.args.pop()
                                    }
                                    fun.args.push(data)
                                    if (typeof fun === 'function')
                                        return fun.apply(fun.args[0], [fun.args[0], data])
                                } else {
                                    if (typeof fun === 'function')
                                        return fun.call(me.ctx[me.name||'null'], data);
                                }
                            }
                        }
                    }
                }
            } else {
                if (getObjType(this.sact) === 'Array') {
                    var acts = this.sact;
                    var _resault = [];
                    acts.map(function(fun) {
                        if (getObjType(fun.args) === 'Array') {
                            if (typeof fun === 'function') {
                                var _tmp = fun.apply(fun.args[0], fun.args);
                                _resault.push(_tmp);
                            }
                        } else {
                            if (typeof fun === 'function') {
                                var _tmp = fun.call(me.ctx[me.name||'null']);
                                _resault.push(_tmp);
                            }
                            if (getObjType(fun)=='Object') {
                              Object.keys(fun).map(function(item){
                                var _tmp = fun[item].call(me.ctx[me.name||'null'])
                                _resault.push(_tmp)
                              })
                            }
                        }
                    })
                    return _resault;
                }
                if (getObjType(this.sact) === 'Object') {
                    var sacts = this.sact
                    if (key) {
                        if (sacts[key]) {
                            var fun = sacts[key]
                            if (getObjType(fun.args) === 'Array') {
                                if (typeof fun === 'function')
                                    return fun.apply(fun.args[0], fun.args)
                            } else {
                                if (typeof fun === 'function')
                                    return fun.call(me.ctx[me.name||'null']);
                            }
                        }
                    } else {
                        for (var item in sacts) {
                            if (typeof sacts[item] === 'function') {
                                var fun = sacts[item]
                                if (getObjType(fun.args) === 'Array') {
                                    if (typeof fun === 'function')
                                        return fun.apply(fun.args[0], fun.args)
                                } else {
                                    if (typeof fun === 'function')
                                        return fun.call(me.ctx[me.name||'null']);
                                }
                            }
                        }
                    }
                }
            }
        }

        this.acter = function(act) {
          if (act) {
            var sactType = getObjType(this.sact)
            switch (sactType) {
              case 'Array':
                this.sact = this.sact.concat(act);
                break;
              case 'Object':
                var that = this
                var actType = getObjType(act)
                switch (actType) {
                  case 'Array':
                    act.map(function(item){
                      var randomId = (new Date()).getTime().toString().substring(3)
                      that.sact['random_'+randomId] = item
                    })
                    break;
                  case 'Object':
                    this.sact =  extend(this.sact, act)
                    break;
                  case 'Function':
                    var randomId = (new Date()).getTime().toString().substring(3)
                    this.sact[randomId] = act
                    break;
                }
                break;
            }
          }
        }

        this.setter = function(data, act) {
            if (data)
                this.sdata = data;

            if (act)
                this.sact = act;
        };

        this.getter = function(type) {
            if (type === 'action')
                return this.sact;

            if (type === 'data')
                return this.sdata;
        };

        this.binder = function(ctx) {
          this.ctx[this.name] = ctx
        }
    }

    var _stock = {}   // 数据存储容器

    //like flux
    var storeAct = {
        append: function(name, dataOrAct, fun) {
            if (!name || name == '') return false;

            var save = _stock;

            if (!save[name]) {
                this.set(name, dataOrAct, fun)
            }
            var target;
            if (getObjType(dataOrAct) === 'Object') {
                if (getObjType(save[name].sdata) === 'Object') {
                    target = extend(true, {}, save[name].sdata, dataOrAct)
                    save[name].setter(target);
                }

                if (getObjType(save[name].sdata) === 'Array') {
                    var tmp = save[name].sdata;
                    tmp.push(dataOrAct)
                    target = tmp
                    save[name].setter(target);
                }
            } else {
                var tmp;
                if (getObjType(dataOrAct) === 'Array'){
                    if (getObjType(save[name].sdata) === 'Array'){
                        tmp = save[name].sdata.concat(dataOrAct);
                    }
                    else
                    if (getObjType(save[name].sdata) &&
                        getObjType(save[name].sdata.data) === 'Array'){

                        var _tmp = save[name].sdata.data.concat(dataOrAct);
                        tmp = {data: _tmp}
                    }
                }
                else {
                    if (getObjType(save[name].sdata) === 'Array'){
                        save[name].sdata.push(dataOrAct)
                    }
                    else {
                        console.error('sax数据类型不匹配');
                    }
                }

                target = tmp;
                save[name].setter( target );
            }
        },

        pop: function(name) {
            if (!name || name == '')
                return false;

            var save = _stock;
            if (save[name]) {
                var tmp = save[name].getter('data')
                if (getObjType(tmp) === 'Array') {
                    var popdata = tmp.pop();
                    save[name].setter(tmp)
                    return [tmp, popdata]
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        set: function(name, dataOrAct, fun) {
            if (!name || name == '') return false;

            var save = _stock;

            if (!save[name]) {
                var thisStore = new store(name);
                save[name] = thisStore;
            }
            if (dataOrAct && dataOrAct !== "") {
                if (getObjType(dataOrAct) === 'Function') {
                    if (getObjType(fun) === 'Array') {
                        dataOrAct.args = fun;
                    }
                    save[name].acter(dataOrAct);
                } else {
                    if (getObjType(dataOrAct) === 'Object' || // 存储 json对象
                        getObjType(dataOrAct) === 'String' || // 存储 string
                        getObjType(dataOrAct) === 'Boolean') { // 存储 boolean对象
                        save[name].setter(dataOrAct);
                    } else
                    if (getObjType(dataOrAct) === 'Array') {
                        var isFuns = true;
                        if (!dataOrAct.length) {
                            save[name].setter(dataOrAct);
                        } else {
                            dataOrAct.map(function(item, i) {
                                if (getObjType(item) !== 'Function')
                                    isFuns = false;
                            })
                            if (isFuns) {
                                if (getObjType(fun) === 'Array') {
                                    dataOrAct.map(function(item, i) {
                                        if (getObjType(fun[i]) === 'Array')
                                            item.args = fun[i];
                                        else {
                                            item.args = [fun[i]]
                                        }
                                    })
                                }
                                save[name].acter(dataOrAct);
                                // save[name].sact = dataOrAct;
                            } else {
                                save[name].setter(dataOrAct); //存储array数据
                            }
                        }
                    }
                }
            }

            if (getObjType(fun) === 'Function')
                save[name].acter(fun);

            if (getObjType(fun) === 'Array') {
                var isFuns = true;
                fun.map(function(item, i) {
                    if (getObjType(item) !== 'Function')
                        isFuns = false;
                })
                if (isFuns) {
                  save[name].acter(fun);
                }
            }

            if (getObjType(fun) === 'Object') {
              save[name].acter(fun)
            }
        },

        get: function(name) {
            if (!name || name == '')
                return;

            var save = _stock;
            if (save[name]) {
                return save[name].getter('data')
            } else {
                return false;
            }
        },

        setter: function(name, dataOrAct, fun) {
          this.set(name, dataOrAct, fun)
          return _stock[name].dataer(dataOrAct)
        },

        getter: function(name) {
            if (!name || name == '')
                return;

            var save = _stock;
            if (save[name]) {
                var that = save[name]

                function runner(data, key) {
                    return that.dataer(data, key)
                }
                return {
                    run: runner,
                    data: save[name].getter('data'),
                    action: save[name].getter('action')
                }
            } else {
                return false;
            }
        },

        deleter: function(name) {
            if (!name || name == '')
                return;

            var save = _stock;
            if (save[name]) {
                delete save[name];
            }
        },

        runner: function(name, ddd, key) {
          if (!name || name == '') return
          var save = _stock
          if (save[name]) {
            var that = save[name]

            function _runner(data, key) {
              return that.dataer(data, key)
            }

            var _data = that.getter('data')
            if (getObjType(_data)== 'Object' && getObjType(ddd) == 'Object') {
              if (ddd.key) key = ddd.key
              delete ddd.key
              _data = extend(true, {}, _data, ddd)
            } else {
              _data = ddd
            }

            if (getObjType(ddd) == 'String') {
              key = ddd;
              ddd = undefined;
            }
            if (that.sact) return _runner(_data, key)
            return _data
          } else {
            if (ddd) return ddd
          }
        },

        has: function(id, cb){
          var keys = Object.keys(_stock)
          if (keys.indexOf(id)>-1) {
            var that = _stock[id]
            if (typeof cb=='function') {
              var _data = that.getter('data')
              return cb(_data)
            }
            return true
          }
        },

        lister: function() {
            return Object.keys(_stock);
        },

        bind: function(name, ctx) {
          if (!name || name == '') return;
          var save = _stock;
          if (!save[name]) save[name] = new store(name)
          save[name].binder(ctx||null)
        },

        setActions: function(name, acts){
          var save = _stock;
          if (!save[name]) save[name] = new store(name)
          save[name].acter(acts)
        }
    }

    storeAct.roll = storeAct.runner
    storeAct.trigger = storeAct.setter

    window.SAX = storeAct;
})();
