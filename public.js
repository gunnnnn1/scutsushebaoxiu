// 登录
function submit() {
       // body...
    var username = $("#id_username").val();
    var password = $("#id_password").val();
    // document.getElementById需要jquery环境,这里已经引入
    // 先使用document.getElementById获取到html内对应id的值
    // $()的作用等同于document.getElementById
$.ajax({
        url : "/api/scut/login",
        type : "post",
        async:true,
        data : {
            username: username,
            password : password,
        },
        dataType : "json",
        // 构造pyload请求API
        complete : function(res) {
            if (res.responseJSON.code == 412 ) {
                alert("请输入账号密码");
                // 弹窗
            }
            if (res.responseJSON.code == 403) {
                alert("用户名或密码错误");
                window.location.href="/login";
                // 跳转
            }
            if (res.responseJSON.code == 200) {
                alert("登录成功");
                // console.log(res.responseJSON.data.token)
                // 以上为对响应码状态的判断并进行弹窗、跳转操作
                var token = res.responseJSON.data.token;
                // 登录成功后,后端API签发jwt
                localStorage.setItem("token", token);
                // 将jwt储存到浏览器cache中
                window.location.href="/report";
                // headers.Authorization=localStorage.getItem("token")

            }
        
    }
    });
};
// 主页
function userinfo() {
    $.ajax({
        url:"/api/userinfo",
        type:"post",
        async:true,
        dataType:"json",
        // 异步构造payload请求,或许到用户个人信息等
        complete : function(res) {
        if (res.responseJSON.code == 403) {
            alert("请先登录");
            window.location.href="/login";
            };
            document.getElementById('id_username').innerText = res.responseJSON.data.username;
            if(document.getElementById('show_name')){
            document.getElementById('show_name').innerText = res.responseJSON.data.username;
            // 将个人信息显示到html页面上
            }
        },
        beforeSend : function(xhr) {
        var token = window.localStorage.getItem('token');
            xhr.setRequestHeader("Authorization", token);
            // 设置请求头，让headers带上前面签发的jwt完成鉴权
        }

    })
};
function logout() {
    window.location.href="/login";
    window.localStorage.clear();
    // 跳转后清理保存过的jwt
};


// 添加
function add() {
    var name = $("#id_name").val()
    var date = $("#date").val();
    var phone = $("#id_phone").val();
    var content = $("#id_content").val()
    var address = $("#id_address").val()
    $.ajax({
        url:"/api/add",
        type:"post",
        dataType:"json",
        data:{
            "name":name,
            "date":date,
            "phone":phone,
            "content":content,
            "address":address
        },
        complete:function(res) {
        if (res.responseJSON.code == 200) {
            alert("报修成功")
            window.location.href="/add";
            // body...
        };
        if (res.responseJSON.code == 401) {
            alert("报修信息不全")
            window.location.href="/add";
        
        };
        },

        beforeSend : function(xhr) {
        var token = window.localStorage.getItem('token');
            xhr.setRequestHeader("Authorization", token);
        },
    })
// 基本原理类似

};    
function reset() {
    window.location.href="/add";
};
// 直接刷新页面实现重置

// 记录

function record() {
    $.ajax({
        url:"/api/record",
        type:"post",
        async:true,
        dataType:"json",
        complete : function(res) {
        if (res.responseJSON.code == 403) {
            alert("请先登录");
            window.location.href="/login";
            };
        if (res.responseJSON.code == 401) {
            alert("您还没有报修记录")
            window.location.href="/add";
        };
            document.getElementById('id_username').innerText = res.responseJSON.data.username;
            let record = res.responseJSON.data.record;
            // console.log(record)
            var html = "";
            if (res.responseJSON.data.role > 1){
                    html = html + '<div class="layui-input-inline"> <span>请输入pid</span> <input type="text" name="pid" id="id_pid"> 状态修改为 <select id = "select"> <option value = "1">已提交</option> <option value = "2">已接单</option> <option value = "3">已处理</option> </select> <button class="layui-btn" lay-submit lay-filter="demo1" onclick="edit()">提交</button>'}

            record.forEach((item,index) => {
                // console.log(item)
                // console.log(item.name)

                
                if (item.status == 1){
                    html = html + '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;"> <div class="layui-input-inline"> <label class="layui-form-label">状态</label> <div class="step_box"><div class="step line"><img src="/static/img/true.png" style="width:20px;height:20px;"><span>已提交</span></div><div class="step line"><img src="/static/img/unTrue.png" style="width:20px;height:20px;"><span>已接单</span></div><div class="step"><img src="/static/img/unTrue.png" style="width:20px;height:20px;"><span>已处理</span></div></div> </div>'
                };
                if (item.status == 2){
                    html = html + '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;"> <div class="layui-input-inline"> <label class="layui-form-label">状态</label> <div class="step_box"><div class="step line"><img src="/static/img/true.png" style="width:20px;height:20px;"><span>已提交</span></div><div class="step line"><img src="/static/img/true.png" style="width:20px;height:20px;"><span>已接单</span></div><div class="step"><img src="/static/img/unTrue.png" style="width:20px;height:20px;"><span>已处理</span></div></div> </div>'
                };
                if (item.status == 3){
                    html = html + '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;"> <div class="layui-input-inline"> <label class="layui-form-label">状态</label> <div class="step_box"><div class="step line"><img src="/static/img/true.png" style="width:20px;height:20px;"><span>已提交</span></div><div class="step line"><img src="/static/img/true.png" style="width:20px;height:20px;"><span>已接单</span></div><div class="step"><img src="/static/img/true.png" style="width:20px;height:20px;"><span>已处理</span></div></div> </div>'
                }
                if (res.responseJSON.data.role <= 1){
                html = html + '<p></p><div class="layui-input-inline"> <label class="layui-form-label">姓名</label> <div class="layui-input-block"> <text type="text" name="name"  autocomplete="off" class="layui-input" id = "id_name">' + item.name +  '</text> </div> </div><div> <label class="layui-form-label">电话</label> <div class="layui-input-block"> <text type="text" name="address"  autocomplete="off" class="layui-input" id = "id_phone">' + item.phone +' </text> </div> </div> <div> <label class="layui-form-label">所属区域</label> <div class="layui-input-block"> <text type="text" name="address"  autocomplete="off" class="layui-input" id = "id_address">' + item.address +'</text> </div> </div> <div class="layui-input-inline"> <label class="layui-form-label">维修师</label> <div class="layui-input-inline"> <text type="text" name="repairman"  autocomplete="off" class="layui-input" id = "id_repairman">' + item.repairman + '  </text> </div> </div> <p></p> <div class="layui-input-inline"> <label class="layui-form-label">处理时间</label> <div class="layui-input-inline"> <text type="text" name="time"  autocomplete="off" class="layui-input" id = "id_time" >' + item.appoint + ' </text> </div> </div> <div class="layui-form-item layui-form-text"> <label class="layui-form-label">详情</label> <div class="layui-input-block"> <text class="layui-textarea" id = "id_content">' + item.content + '</text> </div> </div> </div> </div> </div> </fieldset>'
                }
                else {
                html = html + '<p></p><div class="layui-input-inline"> <label class="layui-form-label">pid</label> <div class="layui-input-block"> <text type="text" name="name"  autocomplete="off" class="layui-input" id = "id_name">' + item.pid +  '</text> </div> </div>' +'<p></p><div class="layui-input-inline"> <label class="layui-form-label">姓名</label> <div class="layui-input-block"> <text type="text" name="name"  autocomplete="off" class="layui-input" id = "id_name">' + item.name +  '</text> </div> </div><div> <label class="layui-form-label">电话</label> <div class="layui-input-block"> <text type="text" name="address"  autocomplete="off" class="layui-input" id = "id_phone">' + item.phone +' </text> </div> </div> <div> <label class="layui-form-label">所属区域</label> <div class="layui-input-block"> <text type="text" name="address"  autocomplete="off" class="layui-input" id = "id_address">' + item.address +'</text> </div> </div> <div class="layui-input-inline"> <label class="layui-form-label">维修师</label> <div class="layui-input-inline"> <text type="text" name="repairman"  autocomplete="off" class="layui-input" id = "id_repairman">' + item.repairman + '  </text> </div> </div> <p></p> <div class="layui-input-inline"> <label class="layui-form-label">处理时间</label> <div class="layui-input-inline"> <text type="text" name="time"  autocomplete="off" class="layui-input" id = "id_time" >' + item.appoint + ' </text> </div> </div> <div class="layui-form-item layui-form-text"> <label class="layui-form-label">详情</label> <div class="layui-input-block"> <text class="layui-textarea" id = "id_content">' + item.content + '</text> </div> </div> </div> </div> </div> </fieldset>'
                }
                })
            document.getElementById('show').innerHTML = html
            // 由于使用原生的js所以这里封装成了HTML源码

        },
        beforeSend : function(xhr) {
        var token = window.localStorage.getItem('token');
            xhr.setRequestHeader("Authorization", token);
        }

    })
};

function edit(){
    var myselect = document.getElementById('select');
    var index=myselect.selectedIndex;
    var status = myselect.options[index].value;
    var pid =  $("#id_pid").val()
    // 获取复选框的值
    $.ajax({
        url:"/api/edit",
        type:"post",
        async:true,
        dataType:"json",
        data:{
            "pid":pid,
            "status":status,
        },
        complete : function(res) {
        if (res.responseJSON.code == 403) {
            alert("请先登录");
            window.location.href="/login";
            };
        if (res.responseJSON.code == 401) {
            alert("权限不足")
            window.location.href="/index";
            };
        if (res.responseJSON.code == 200) {
            alert("修改成功")
            window.location.href="/record";
            };
        },   
        beforeSend : function(xhr) {
        var token = window.localStorage.getItem('token');
            xhr.setRequestHeader("Authorization", token);
        },
    });
}

