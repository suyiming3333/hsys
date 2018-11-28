/**
 * messageboard管理初始化
 */
var MessageBoard = {
    id: "MessageBoardTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
MessageBoard.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '用户id', field: 'userId', visible: true, align: 'center', valign: 'middle'},
            {title: '用户名', field: 'userName', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createTime', visible: true, align: 'center', valign: 'middle'},
            {title: '更新时间', field: 'updateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '留言标题', field: 'title', visible: true, align: 'center', valign: 'middle'},
            {title: '内容', field: 'content', visible: true, align: 'center', valign: 'middle'},
            {title: '状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '是否删除', field: 'isDelete', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
MessageBoard.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        MessageBoard.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加messageboard
 */
MessageBoard.openAddMessageBoard = function () {
    var index = layer.open({
        type: 2,
        title: '添加messageboard',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/messageBoard/messageBoard_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看messageboard详情
 */
MessageBoard.openMessageBoardDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: 'messageboard详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/messageBoard/messageBoard_update/' + MessageBoard.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除messageboard
 */
MessageBoard.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/messageBoard/delete", function (data) {
            Feng.success("删除成功!");
            MessageBoard.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("messageBoardId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询messageboard列表
 */
MessageBoard.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    MessageBoard.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = MessageBoard.initColumn();
    var table = new BSTable(MessageBoard.id, "/messageBoard/list", defaultColunms);
    table.setPaginationType("client");
    MessageBoard.table = table.init();
});
