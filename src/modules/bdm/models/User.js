import {actions} from 'mirrorx';
import * as api from "../services/User";
import { Info,Error } from "utils";

export default {
    name : "user",
    initialState : {
        list: [],
        user : {
            username : "",
            sex : "",
            age : ""
        },
        showModal : false
    },
    reducers : {
        save(state, data) {
            return {
                ...state,
                ...data
            }
        }
    },
    effects : {
        async load() {
            let { data : { data : list ,success } } = await api.get();
            if (success) {
                actions.user.save({list});
            }else{
                Error('数据请求失败');
            }
        },
        clear(){
            actions.user.save({list:[]});
            Info("数据清除完毕");
        },
        async create(data,getState){
            let { data : { success } } = await api.add(data);
            if (success) {
                actions.user.load();
            }
        },
        async createByPage(data,getState){
            let { data : { success } } = await api.add(data);
            if (success) {
                Info("用户添加成功");
                actions.routing.goBack();
            }
        },
        async edit(data,getState){
            let { data : { success } } = await api.edit(data);
            if (success) {
                actions.user.load();
            }
        },
        async editByPage(data,getState){
            let { data : { success } } = await api.edit(data);
            if (success) {
                Info("用户修改成功");
                actions.routing.goBack();
            }
        },
        
        async remove(data,getState){
            let { data : { success } } = await api.remove(data);
            if (success) {
                actions.user.load();
            }
        }
    }
}