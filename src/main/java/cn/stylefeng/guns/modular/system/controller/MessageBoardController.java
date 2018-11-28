package cn.stylefeng.guns.modular.system.controller;

import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import cn.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import cn.stylefeng.guns.modular.system.model.MessageBoard;
import cn.stylefeng.guns.modular.system.service.IMessageBoardService;

/**
 * messageboard控制器
 *
 * @author fengshuonan
 * @Date 2018-11-28 15:00:02
 */
@Controller
@RequestMapping("/messageBoard")
public class MessageBoardController extends BaseController {

    private String PREFIX = "/system/messageBoard/";

    @Autowired
    private IMessageBoardService messageBoardService;

    /**
     * 跳转到messageboard首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "messageBoard.html";
    }

    /**
     * 跳转到添加messageboard
     */
    @RequestMapping("/messageBoard_add")
    public String messageBoardAdd() {
        return PREFIX + "messageBoard_add.html";
    }

    /**
     * 跳转到修改messageboard
     */
    @RequestMapping("/messageBoard_update/{messageBoardId}")
    public String messageBoardUpdate(@PathVariable Integer messageBoardId, Model model) {
        MessageBoard messageBoard = messageBoardService.selectById(messageBoardId);
        model.addAttribute("item",messageBoard);
        LogObjectHolder.me().set(messageBoard);
        return PREFIX + "messageBoard_edit.html";
    }

    /**
     * 获取messageboard列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return messageBoardService.selectList(null);
    }

    /**
     * 新增messageboard
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(MessageBoard messageBoard) {
        messageBoardService.insert(messageBoard);
        return SUCCESS_TIP;
    }

    /**
     * 删除messageboard
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer messageBoardId) {
        messageBoardService.deleteById(messageBoardId);
        return SUCCESS_TIP;
    }

    /**
     * 修改messageboard
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(MessageBoard messageBoard) {
        messageBoardService.updateById(messageBoard);
        return SUCCESS_TIP;
    }

    /**
     * messageboard详情
     */
    @RequestMapping(value = "/detail/{messageBoardId}")
    @ResponseBody
    public Object detail(@PathVariable("messageBoardId") Integer messageBoardId) {
        return messageBoardService.selectById(messageBoardId);
    }
}
