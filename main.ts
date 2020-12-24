//% color="#006400" weight=50 icon="\uf1b9" block="呼噜猫小车通信确认"
namespace HuLuMaoCar_connection {

    export enum connet{
        //% blockId="no" block="不建立"
        no = 0,
        //% blockId="yes" block="建立"
        yes = 1
    }
    /**
     * 调用此来建立MicroBit与小车的通信
     * @param index
    */
    //% blockId=HuLuMaoCar_connection_con block="建立 MicroBit 与小车的通信"
    //% weight=100
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con(): void {
        let length;
        for(let i=0;i<20;i++){
            length=pins.i2cReadNumber(66, NumberFormat.Int8LE);
            if(length==55){
                basic.showIcon(IconNames.Yes);
                basic.pause(1000);
                basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `);
                break;
            }
            else{
                basic.showIcon(IconNames.No);
            }
        }
    }

    /**
     * 调用此来建立小车与遥控器的通信,并设置一个通信密码(最大为255)
     * @param index
    */
    //% blockId=HuLuMaoCar_connection_con1 block="小车与遥控器|%index1通信,通信密码为|%index"
    //% weight=99
    //% blockGap=10
    //% index.min=1 index.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con1(index1:connet,index:number): void {
        let data=0;
        let aaa=0;
        switch(index1){
            case connet.yes:aaa=1;break;
            case connet.no:aaa=2;break;
        }
        if(aaa==2){
            pins.i2cWriteNumber(65, 1, NumberFormat.UInt8LE);
        }
        else if(aaa==1){
            for(let i=0;i<8;i++){
                pins.i2cWriteNumber(75, index, NumberFormat.UInt8LE);
            }
            while(data!=2){
                basic.pause(10);
                data=pins.i2cReadNumber(75, NumberFormat.Int8LE);
                basic.showIcon(IconNames.SmallSquare);
            }
            basic.showIcon(IconNames.Square);
            basic.pause(1000);
            basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
            `);
        }
    }
}

//% color="#006400" weight=49 icon="\uf1b9" block="呼噜猫小车传感器类"
namespace HuLuMaoCar {

    export enum ultrasonicState{
        //% blockId="OFF" block="关闭"
        Off = 0,
        //% blockId="Open" block="开启"
        Open = 1
    }
    export enum DisplayChine{
        //% blockId="wo" block="我"
        wo = 0,
        //% blockId="ni" block="你"
        ni = 1,
        //% blockId="tuo" block="呼"
        tuo,
        //% blockId="yu" block="噜"
        yu,
        //% blockId="ke" block="猫"
        ke,
        //% blockId="ji" block="机"
        ji,
        //% blockId="zhi" block="器"
        zhi,
        //% blockId="neng" block="人"
        neng,
        //% blockId="xiao" block="编"
        xiao,
        //% blockId="che" block="程"
        che

    }
    export enum DisplayEnglish{
        a = 0, b, c, d, e, f, g, h, i, j,
        k, l, m, n, o, p, q, r, s, t,
        u, v, w, x, y, z, A, B, C, D,
        E, F, G, H, I, J, K, L, M, N,
        O, P, Q, R, S, T, U, V, W, X, Y, Z
    }
    export enum DisplayChar{
        //% blockId="_gan" block="! 感叹号"
        _gan=0,
        //% blockId="_shuang" block="“ 双引号"
        _shuang,
        //% blockId="_jin" block="# 井号"
        _jin,
        //% blockId="_mei" block="$ 美元符号"
        _mei,
        //% blockId="_bai" block="% 百分号"
        _bai,
        //% blockId="_he" block="& 和符号"
        _he,
        //% blockId="_kaidan" block="' 开单引号"
        _kaidan,
        //% blockId="_bidan" block="' 关单引号"
        _bidan,
        //% blockId="_kai" block="( 开括号"
        _kai,
        //% blockId="_guan" block=") 关括号"
        _guan,
        //% blockId="_xing" block="* 星号"
        _xing,
        //% blockId="_jia" block="+ 加号"
        _jia,
        //% blockId="_dou" block=", 逗号"
        _dou,
        //% blockId="_jian" block="- 减号"
        _jian,
        //% blockId="_ju" block=". 句号"
        _ju,
        //% blockId="_xie" block="/ 斜杠"
        _xie,
        //% blockId="_xie" block="/ 反斜杠"
        _fanxie,
        //% blockId="_mao" block=": 冒号"
        _mao,
        //% blockId="_fen" block="; 分号"
        _fen,
        //% blockId="_xiao" block="< 小于号"
        _xiao,
        //% blockId="_deng" block="= 等于号"
        _deng,
        //% blockId="_da" block="> 大于号"
        _da,
        //% blockId="_wen" block="? 问号"
        _wen,
        //% blockId="_dian" block="@ 电子邮件符号"
        _dian,
        //% blockId="_kaifang" block="[ 开方括号"
        _kaifang,
        //% blockId="_bifang" block="] 闭方括号"
        _bifang,
        //% blockId="_tuo" block="^ 乘方符号"
        _tuo,
        //% blockId="_xia" block="_ 下划线"
        _xia,
        //% blockId="_kaihua" block="{ 开花括号"
        _kaihua,
        //% blockId="_cui" block="| 垂直线"
        _cui,
        //% blockId="_bihua" block="} 闭花括号"
        _bihua,
        //% blockId="_bo" block="~ 波浪号"
        _bo
    }
    export enum Y{
        //% blockId="_0" block="0"
        _0= 0,
        //% blockId="_2" block="2"
        _2,
        //% blockId="_4" block="4"
        _4,
        //% blockId="_6" block="6"
        _6
    }
    
    export enum X{
        //% blockId="_0" block="0"
        _0 = 0,
        //% blockId="_8" block="8"
        _8,
        //% blockId="_16" block="16"
        _16,
        //% blockId="_24" block="24"
        _24,
        //% blockId="_32" block="32"
        _32,
        //% blockId="_40" block="40"
        _40,
        //% blockId="_48" block="48"
        _48,
        //% blockId="_56" block="56"
        _56,
        //% blockId="_64" block="64"
        _64,
        //% blockId="_72" block="72"
        _72,
        //% blockId="_80" block="80"
        _80,
        //% blockId="_88" block="88"
        _88,
        //% blockId="_96" block="96"
        _96,
        //% blockId="_104" block="104"
        _104,
        //% blockId="_112" block="112"
        _112,
        //% blockId="_120" block="120"
        _120
    }
    export enum X1{
        //% blockId="_0" block="0"
        _0 = 0,
        //% blockId="_8" block="8"
        _8,
        //% blockId="_16" block="16"
        _16,
        //% blockId="_24" block="24"
        _24,
        //% blockId="_32" block="32"
        _32,
        //% blockId="_40" block="40"
        _40,
        //% blockId="_48" block="48"
        _48,
        //% blockId="_56" block="56"
        _56,
        //% blockId="_64" block="64"
        _64,
        //% blockId="_72" block="72"
        _72,
        //% blockId="_80" block="80"
        _80,
        //% blockId="_88" block="88"
        _88,
        //% blockId="_96" block="96"
        _96,
        //% blockId="_104" block="104"
        _104,
        //% blockId="_112" block="112"
        _112,
    }
    export enum X2{
        //% blockId="_8" block="8"
        _8,
        //% blockId="_16" block="16"
        _16,
        //% blockId="_24" block="24"
        _24,
        //% blockId="_32" block="32"
        _32,
        //% blockId="_40" block="40"
        _40,
        //% blockId="_48" block="48"
        _48,
        //% blockId="_56" block="56"
        _56,
        //% blockId="_64" block="64"
        _64,
        //% blockId="_72" block="72"
        _72,
        //% blockId="_80" block="80"
        _80,
        //% blockId="_88" block="88"
        _88,
        //% blockId="_96" block="96"
        _96,
        //% blockId="_104" block="104"
        _104,
        //% blockId="_112" block="112"
        _112,
        //% blockId="_120" block="120"
        _120,
        //% blockId="_128" block="128"
        _128
    }
    export enum FollowSet{
        //% blockId="left" block="左边"
        left,
        //% blockId="mid" block="中间"
        mid,
        //% blockId="right" block="右边"
        right
    }
    export enum FollowColour{
        //% blockId="black" block="黑线"
        black,
        //% blockId="white" block="白线"
        white
    }
    export function IICWrite(value:number,value1:number) {
        
        pins.i2cWriteNumber(value, value1, NumberFormat.UInt8LE);
    }
    export function IICWriteBuf3(value: number, value1: number, value2: number) {
        let buf = pins.createBuffer(2);
        buf[0] = value1;
        buf[1] = value2;
        
        pins.i2cWriteBuffer(value, buf);
    }
    export function IICWriteBuf(value: number, value1: number, value2: number, value3: number, value4: number) {
        let buf = pins.createBuffer(4);
        buf[0] = value1;
        buf[1] = value2;
        buf[2] = value3;
        buf[3] = value4;
        
        pins.i2cWriteBuffer(value, buf);
    }
    function SPIWrite(value: number) {
        pins.spiPins(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2);
        pins.spiFormat(8, 3);
        pins.spiFrequency(100000);
        pins.spiWrite(value);
    }
    /**
     * 选择以打开或关闭小车超声波测量距离的功能（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=HuLuMaoCar_Chao_Sheng_Bo block="超声波测距系统|%index"
    //% weight=112
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Chao_Sheng_Bo(index: ultrasonicState):void {
        basic.pause(10);
        switch (index) {
            case ultrasonicState.Off: IICWrite(65, 1); break;
            case ultrasonicState.Open: IICWrite(65, 2); break;
        }
    }

    /**
     * 调用此将返回超声波的所测到的距离（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=HuLuMaoCar_Read_Chao_Sheng_Bo block="读取超声波测到的距离(cm)"
    //% weight=111
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Read_Chao_Sheng_Bo(): number {
        let length;
        basic.pause(10);
        length=pins.i2cReadNumber(65, NumberFormat.Int8LE);
        return length;
    }
    /**
     * 调用此将返回火焰传感器测到的火焰数据,数据越小,离火焰越近
     * @param index
    */
    //% blockId=HuLuMaoCar_Flame block="读取火焰传感器返回的数据"
    //% weight=110
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Flame():number {
        let length;
        basic.pause(10);
        length = pins.analogReadPin(AnalogPin.P3);
        return length;
    }
    /**
     * 调用此将返回光敏电阻返回的亮度值
     * @param index
    */
    //% blockId=HuLuMaoCar_Photoresistor block="读取光敏电阻测到的亮度，最高亮度值不超过1023"
    //% weight=109
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Photoresistor(): number {
        let data;
        data=pins.analogReadPin(AnalogPin.P2);
       // data=data*3.18/10;
        return Math.round(data);
    }
    /**
     * 调用此将返回热敏电阻返回的温度值（0代表最冷，333代表最热）
     * @param index
    */
    //% blockId=HuLuMaoCar_Thermistor block="读取热敏电阻测到的热度，最高热度值不超过1023"
    //% weight=108
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Thermistor(): number {
        let data;
        data=pins.analogReadPin(AnalogPin.P2);
        //data=data*3.18/10;
        return Math.round(data);
    }
    /**
     * 选择以打开小车循迹传感器功能
     * @param index
    */
    //% blockId=HuLuMaoCar_Follow block="巡线传感器|%index 位置检测到 |%index1"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Follow(index:FollowSet,index1:FollowColour):boolean {
        let temp: boolean = false;
        let temp1;
        basic.pause(10);
        switch (index) {
            case FollowSet.left:switch(index1){
                case FollowColour.black:if(pins.digitalReadPin(DigitalPin.P15)==0)temp1=1;else temp1=0;break;    /*检测到黑线返回0*/    
                case FollowColour.white:if(pins.digitalReadPin(DigitalPin.P15)==1)temp1=1;else temp1=0;break;    /*检测到白线返回1*/   
            };break;
            case FollowSet.mid:switch(index1){
                case FollowColour.black:if(pins.digitalReadPin(DigitalPin.P14)==0)temp1=1;else temp1=0;break;
                case FollowColour.white:if(pins.digitalReadPin(DigitalPin.P14)==1)temp1=1;else temp1=0;break;
            };break;
            case FollowSet.right:switch(index1){
                case FollowColour.black:if(pins.digitalReadPin(DigitalPin.P13)==0)temp1=1;else temp1=0;break;
                case FollowColour.white:if(pins.digitalReadPin(DigitalPin.P13)==1)temp1=1;else temp1=0;break;
            };break;
        }
        if(temp1==1)
            temp=true;
        else
            temp=false;
        return temp;
    }
    /**
     * 选择以打开小车人体红外传感器功能
     * @param index
    */
    //% blockId=HuLuMaoCar_Bodycheck block="当人体传感器检测到人体或者活物时"
    //% weight=98
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Bodycheck():boolean {
        let temp: boolean = false;
       // let temp1;
        basic.pause(10);
      //  temp1=pins.i2cReadNumber(72, NumberFormat.Int8LE);
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            temp = true;
        }
        else {
            temp=false;
        }
       // if(temp1==1)
      //      temp=true;
      //  else
      //      temp=false;
        return temp;
    }
    /**
     * 选择以打开小车水滴传感器功能
     * @param index
    */
    //% blockId=HuLuMaoCar_Rain block="当水滴传感器检测到水滴时"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Rain():boolean {
        let temp: boolean = false;
     //   let temp1;
        basic.pause(10);
        if (pins.digitalReadPin(DigitalPin.P3) == 0) {
            temp = true;
        }
        else {
            temp=false;
        }
     //   temp1=pins.i2cReadNumber(73, NumberFormat.Int8LE);
     //   if(temp1==1)
     //       temp=true;
     //   else
     //       temp=false;
        return temp;
    }
    /**
     * 选择以打开小车气体传感器功能，可检测一氧化碳,烟雾，可燃气体等
     * @param index
    */
    //% blockId=HuLuMaoCar_Gas block="当气体传感器检测到目标气体时"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Gas():boolean {
        let temp: boolean = false;
      //  let temp1;
        basic.pause(10);
        if (pins.digitalReadPin(DigitalPin.P3) == 0) {
            temp = true;
        }
        else {
            temp=false;
        }
      //  temp1=pins.i2cReadNumber(74, NumberFormat.Int8LE);
       // if(temp1==1)
       //     temp=true;
       // else
       //     temp=false;
        return temp;
    }

    
    /**
     * 选择以打开声音传感器功能
     * @param index
    */
    //% blockId=HuLuMaoCar_Voice block="当声音传感器检测到有声音产生时"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Voice():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 0) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }
}


//% color="#006400" weight=48 icon="\uf1b9" block="呼噜猫小车显示类"
namespace HuLuMaoCar1{

     /**
     * 选择以清除小车显示屏所有区域的内容
     * @param index
    */
    //% blockId=HuLuMaoCar1_OLEDCleanALL block="清空显示屏所有内容"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function OLEDCleanALL():void {
        basic.pause(10);
        let buf1=pins.createBuffer(3);
        buf1[0]=1;
        buf1[1]=0;
        buf1[2]=0;
        pins.i2cWriteBuffer(73, buf1);
    }

    /**
     * 选择以清除小车显示屏指定区域的内容
     * @param index
    */
    //% blockId=HuLuMaoCar1_OLEDClean block="清除第|%index行|从|%index2到|%index3|处内容"
    //% weight=94
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function OLEDClean(index:HuLuMaoCar.Y,index1:HuLuMaoCar.X,index2:HuLuMaoCar.X2):void{
        let buf1=pins.createBuffer(3);
        basic.pause(10);
        switch(index){
            case HuLuMaoCar.Y._0: buf1[0]=0; break;
            case HuLuMaoCar.Y._2: buf1[0]=2; break;
            case HuLuMaoCar.Y._4: buf1[0]=4; break;
            case HuLuMaoCar.Y._6: buf1[0]=6; break;
        }
        switch(index1){
            case HuLuMaoCar.X._0:  buf1[1]=0; break;
            case HuLuMaoCar.X._8:  buf1[1]=8; break;
            case HuLuMaoCar.X._16: buf1[1]=16; break;
            case HuLuMaoCar.X._24: buf1[1]=24; break;
            case HuLuMaoCar.X._32: buf1[1]=32; break;
            case HuLuMaoCar.X._40: buf1[1]=40; break;
            case HuLuMaoCar.X._48: buf1[1]=48; break;
            case HuLuMaoCar.X._56: buf1[1]=56; break;
            case HuLuMaoCar.X._64: buf1[1]=64; break;
            case HuLuMaoCar.X._72: buf1[1]=72; break;
            case HuLuMaoCar.X._80: buf1[1]=80; break;
            case HuLuMaoCar.X._88: buf1[1]=88; break;
            case HuLuMaoCar.X._96: buf1[1]=96; break;
            case HuLuMaoCar.X._104: buf1[1]=104; break;
            case HuLuMaoCar.X._112: buf1[1]=112; break;
            case HuLuMaoCar.X._120: buf1[1]=120; break;
        }
        switch(index2){
            case HuLuMaoCar.X2._8:  buf1[2]=8; break;
            case HuLuMaoCar.X2._16: buf1[2]=16; break;
            case HuLuMaoCar.X2._24: buf1[2]=24; break;
            case HuLuMaoCar.X2._32: buf1[2]=32; break;
            case HuLuMaoCar.X2._40: buf1[2]=40; break;
            case HuLuMaoCar.X2._48: buf1[2]=48; break;
            case HuLuMaoCar.X2._56: buf1[2]=56; break;
            case HuLuMaoCar.X2._64: buf1[2]=64; break;
            case HuLuMaoCar.X2._72: buf1[2]=72; break;
            case HuLuMaoCar.X2._80: buf1[2]=80; break;
            case HuLuMaoCar.X2._88: buf1[2]=88; break;
            case HuLuMaoCar.X2._96: buf1[2]=96; break;
            case HuLuMaoCar.X2._104: buf1[2]=104; break;
            case HuLuMaoCar.X2._112: buf1[2]=112; break;
            case HuLuMaoCar.X2._120: buf1[2]=120; break;
            case HuLuMaoCar.X2._128:  buf1[2]=128; break;
        }
        pins.i2cWriteBuffer(73, buf1);
        basic.pause(10);
    }

    /**
     * 选择以打开小车显示屏显示中文功能
     * @param index
    */
    //% blockId=HuLuMaoCar1_OLEDShowChine block="显示中文|在第%index2行|第%index3处|显示%index1"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function OLEDShowChine(index2:HuLuMaoCar.Y,index3:HuLuMaoCar.X1,index1:HuLuMaoCar.DisplayChine):void {
        let buf1 = pins.createBuffer(3);
        basic.pause(10);
        switch (index2) {
            case HuLuMaoCar.Y._0: buf1[0]=0; break;
            case HuLuMaoCar.Y._2: buf1[0]=2; break;
            case HuLuMaoCar.Y._4: buf1[0]=4; break;
            case HuLuMaoCar.Y._6: buf1[0]=6; break;
        }
        switch (index3) {
            case HuLuMaoCar.X1._0:  buf1[1]=0; break;
            case HuLuMaoCar.X1._8:  buf1[1]=8; break;
            case HuLuMaoCar.X1._16: buf1[1]=16; break;
            case HuLuMaoCar.X1._24: buf1[1]=24; break;
            case HuLuMaoCar.X1._32: buf1[1]=32; break;
            case HuLuMaoCar.X1._40: buf1[1]=40; break;
            case HuLuMaoCar.X1._48: buf1[1]=48; break;
            case HuLuMaoCar.X1._56: buf1[1]=56; break;
            case HuLuMaoCar.X1._64: buf1[1]=64; break;
            case HuLuMaoCar.X1._72: buf1[1]=72; break;
            case HuLuMaoCar.X1._80: buf1[1]=80; break;
            case HuLuMaoCar.X1._88: buf1[1]=88; break;
            case HuLuMaoCar.X1._96: buf1[1]=96; break;
            case HuLuMaoCar.X1._104: buf1[1]=104; break;
            case HuLuMaoCar.X1._112: buf1[1]=112; break;
        }

        switch (index1) {
            case HuLuMaoCar.DisplayChine.wo: buf1[2]=0; break;
            case HuLuMaoCar.DisplayChine.ni: buf1[2]=1; break;
            case HuLuMaoCar.DisplayChine.tuo: buf1[2]=2; break;
            case HuLuMaoCar.DisplayChine.yu: buf1[2]=3; break;
            case HuLuMaoCar.DisplayChine.ke: buf1[2]=4; break;
            case HuLuMaoCar.DisplayChine.ji: buf1[2]=5; break;
            case HuLuMaoCar.DisplayChine.zhi: buf1[2]=6; break;
            case HuLuMaoCar.DisplayChine.neng: buf1[2]=7; break;
            case HuLuMaoCar.DisplayChine.xiao: buf1[2]=8; break;
            case HuLuMaoCar.DisplayChine.che: buf1[2]=9; break;
        }
        pins.i2cWriteBuffer(69, buf1);
    }
    /**
     * 选择以打开小车显示屏显示字母功能
     * @param index
    */
    //% blockId=HuLuMaoCar1_OLEDShowEnglish block="显示字母|在第%index1行|第%index2处|显示%index3"
    //% weight=92
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function OLEDShowEnglish(index1:HuLuMaoCar.Y,index2:HuLuMaoCar.X,index3:HuLuMaoCar.DisplayEnglish):void {
        let buf1 = pins.createBuffer(3);
        basic.pause(10);
        switch (index1) {
            case HuLuMaoCar.Y._0: buf1[0]=0; break;
            case HuLuMaoCar.Y._2: buf1[0]=2; break;
            case HuLuMaoCar.Y._4: buf1[0]=4; break;
            case HuLuMaoCar.Y._6: buf1[0]=6; break;
        }
        switch (index2) {
            case HuLuMaoCar.X._0:  buf1[1]=0; break;
            case HuLuMaoCar.X._8:  buf1[1]=8; break;
            case HuLuMaoCar.X._16: buf1[1]=16; break;
            case HuLuMaoCar.X._24: buf1[1]=24; break;
            case HuLuMaoCar.X._32: buf1[1]=32; break;
            case HuLuMaoCar.X._40: buf1[1]=40; break;
            case HuLuMaoCar.X._48: buf1[1]=48; break;
            case HuLuMaoCar.X._56: buf1[1]=56; break;
            case HuLuMaoCar.X._64: buf1[1]=64; break;
            case HuLuMaoCar.X._72: buf1[1]=72; break;
            case HuLuMaoCar.X._80: buf1[1]=80; break;
            case HuLuMaoCar.X._88: buf1[1]=88; break;
            case HuLuMaoCar.X._96: buf1[1]=96; break;
            case HuLuMaoCar.X._104: buf1[1]=104; break;
            case HuLuMaoCar.X._112: buf1[1]=112; break;
            case HuLuMaoCar.X._120: buf1[1]=120; break;
        }
        switch (index3) {
            case HuLuMaoCar.DisplayEnglish.a: buf1[2]=97; break;
            case HuLuMaoCar.DisplayEnglish.b: buf1[2]=98; break;
            case HuLuMaoCar.DisplayEnglish.c: buf1[2]=99; break;
            case HuLuMaoCar.DisplayEnglish.d: buf1[2]=100; break;
            case HuLuMaoCar.DisplayEnglish.e: buf1[2]=101; break;
            case HuLuMaoCar.DisplayEnglish.f: buf1[2]=102; break;
            case HuLuMaoCar.DisplayEnglish.g: buf1[2]=103; break;
            case HuLuMaoCar.DisplayEnglish.h: buf1[2]=104; break;
            case HuLuMaoCar.DisplayEnglish.i: buf1[2]=105; break;
            case HuLuMaoCar.DisplayEnglish.j: buf1[2]=106; break;
            case HuLuMaoCar.DisplayEnglish.k: buf1[2]=107; break;
            case HuLuMaoCar.DisplayEnglish.l: buf1[2]=108; break;
            case HuLuMaoCar.DisplayEnglish.m: buf1[2]=109; break;
            case HuLuMaoCar.DisplayEnglish.n: buf1[2]=110; break;
            case HuLuMaoCar.DisplayEnglish.o: buf1[2]=111; break;
            case HuLuMaoCar.DisplayEnglish.p: buf1[2]=112; break;
            case HuLuMaoCar.DisplayEnglish.q: buf1[2]=113; break;
            case HuLuMaoCar.DisplayEnglish.r: buf1[2]=114; break;
            case HuLuMaoCar.DisplayEnglish.s: buf1[2]=115; break;
            case HuLuMaoCar.DisplayEnglish.t: buf1[2]=116; break;
            case HuLuMaoCar.DisplayEnglish.u: buf1[2]=117; break;
            case HuLuMaoCar.DisplayEnglish.v: buf1[2]=118; break;
            case HuLuMaoCar.DisplayEnglish.w: buf1[2]=119; break;
            case HuLuMaoCar.DisplayEnglish.x: buf1[2]=120; break;
            case HuLuMaoCar.DisplayEnglish.y: buf1[2]=121; break;
            case HuLuMaoCar.DisplayEnglish.z: buf1[2]=122; break;

            case HuLuMaoCar.DisplayEnglish.A: buf1[2]=65; break;
            case HuLuMaoCar.DisplayEnglish.B: buf1[2]=66; break;
            case HuLuMaoCar.DisplayEnglish.C: buf1[2]=67; break;
            case HuLuMaoCar.DisplayEnglish.D: buf1[2]=68; break;
            case HuLuMaoCar.DisplayEnglish.E: buf1[2]=69; break;
            case HuLuMaoCar.DisplayEnglish.F: buf1[2]=70; break;
            case HuLuMaoCar.DisplayEnglish.G: buf1[2]=71; break;
            case HuLuMaoCar.DisplayEnglish.H: buf1[2]=72; break;
            case HuLuMaoCar.DisplayEnglish.I: buf1[2]=73; break;
            case HuLuMaoCar.DisplayEnglish.J: buf1[2]=74; break;
            case HuLuMaoCar.DisplayEnglish.K: buf1[2]=75; break;
            case HuLuMaoCar.DisplayEnglish.L: buf1[2]=76; break;
            case HuLuMaoCar.DisplayEnglish.M: buf1[2]=77; break;
            case HuLuMaoCar.DisplayEnglish.N: buf1[2]=78; break;
            case HuLuMaoCar.DisplayEnglish.O: buf1[2]=79; break;
            case HuLuMaoCar.DisplayEnglish.P: buf1[2]=80; break;
            case HuLuMaoCar.DisplayEnglish.Q: buf1[2]=81; break;
            case HuLuMaoCar.DisplayEnglish.R: buf1[2]=82; break;
            case HuLuMaoCar.DisplayEnglish.S: buf1[2]=83; break;
            case HuLuMaoCar.DisplayEnglish.T: buf1[2]=84; break;
            case HuLuMaoCar.DisplayEnglish.U: buf1[2]=85; break;
            case HuLuMaoCar.DisplayEnglish.V: buf1[2]=86; break;
            case HuLuMaoCar.DisplayEnglish.W: buf1[2]=87; break;
            case HuLuMaoCar.DisplayEnglish.X: buf1[2]=88; break;
            case HuLuMaoCar.DisplayEnglish.Y: buf1[2]=89; break;
            case HuLuMaoCar.DisplayEnglish.Z: buf1[2]=90; break;
        }
        pins.i2cWriteBuffer(70, buf1);
        
    }
    /**
     * 选择以打开小车显示屏显示数字功能,输入的数字不能超过65535
     * @param index
    */
    //% blockId=HuLuMaoCar1_OLEDShowNumber block="显示数字|在第%index2行|第%index3|处|显示%index1"
    //% weight=91
    //% blockGap=10
    //% index1.min=0 index1.max=65535
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function OLEDShowNumber(index2:HuLuMaoCar.Y,index3:HuLuMaoCar.X,index1:number):void {
        let buf1 = pins.createBuffer(2);
        //let buf;
        basic.pause(10);
        switch (index2) {
            case HuLuMaoCar.Y._0: buf1[0]=0; break;
            case HuLuMaoCar.Y._2: buf1[0]=2; break;
            case HuLuMaoCar.Y._4: buf1[0]=4; break;
            case HuLuMaoCar.Y._6: buf1[0]=6; break;
        }
        switch (index3) {
            case HuLuMaoCar.X._0:  buf1[1]=0; break;
            case HuLuMaoCar.X._8:  buf1[1]=8; break;
            case HuLuMaoCar.X._16: buf1[1]=16; break;
            case HuLuMaoCar.X._24: buf1[1]=24; break;
            case HuLuMaoCar.X._32: buf1[1]=32; break;
            case HuLuMaoCar.X._40: buf1[1]=40; break;
            case HuLuMaoCar.X._48: buf1[1]=48; break;
            case HuLuMaoCar.X._56: buf1[1]=56; break;
            case HuLuMaoCar.X._64: buf1[1]=64; break;
            case HuLuMaoCar.X._72: buf1[1]=72; break;
            case HuLuMaoCar.X._80: buf1[1]=80; break;
            case HuLuMaoCar.X._88: buf1[1]=88; break;
            case HuLuMaoCar.X._96: buf1[1]=96; break;
            case HuLuMaoCar.X._104: buf1[1]=104; break;
            case HuLuMaoCar.X._112: buf1[1]=112; break;
            case HuLuMaoCar.X._120: buf1[1]=120; break;
        }
       // buf=index1;
        pins.i2cWriteBuffer(71,buf1);
        basic.pause(7);
        pins.i2cWriteNumber(71, index1, NumberFormat.UInt16LE);
    }

    /**
     * 选择以打开小车显示屏显示字符功能
     * @param index
    */
    //% blockId=HuLuMaoCar1_OLEDShowChar block="显示字符|在第%index2行|第%index3处|显示 %index1"
    //% weight=90
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=20
    export function OLEDShowChar(index2:HuLuMaoCar.Y,index3:HuLuMaoCar.X,index1:HuLuMaoCar.DisplayChar):void {
        let buf1 = pins.createBuffer(3);
        basic.pause(10);
        switch (index2) {
            case HuLuMaoCar.Y._0: buf1[0]=0; break;
            case HuLuMaoCar.Y._2: buf1[0]=2; break;
            case HuLuMaoCar.Y._4: buf1[0]=4; break;
            case HuLuMaoCar.Y._6: buf1[0]=6; break;
        }
        switch (index3) {
            case HuLuMaoCar.X._0:  buf1[1]=0; break;
            case HuLuMaoCar.X._8:  buf1[1]=8; break;
            case HuLuMaoCar.X._16: buf1[1]=16; break;
            case HuLuMaoCar.X._24: buf1[1]=24; break;
            case HuLuMaoCar.X._32: buf1[1]=32; break;
            case HuLuMaoCar.X._40: buf1[1]=40; break;
            case HuLuMaoCar.X._48: buf1[1]=48; break;
            case HuLuMaoCar.X._56: buf1[1]=56; break;
            case HuLuMaoCar.X._64: buf1[1]=64; break;
            case HuLuMaoCar.X._72: buf1[1]=72; break;
            case HuLuMaoCar.X._80: buf1[1]=80; break;
            case HuLuMaoCar.X._88: buf1[1]=88; break;
            case HuLuMaoCar.X._96: buf1[1]=96; break;
            case HuLuMaoCar.X._104: buf1[1]=104; break;
            case HuLuMaoCar.X._112: buf1[1]=112; break;
            case HuLuMaoCar.X._120: buf1[1]=120; break;
        }

        switch (index1) {
            case HuLuMaoCar.DisplayChar._gan:buf1[2]=33;break;
            case HuLuMaoCar.DisplayChar._shuang:buf1[2]=34;break;
            case HuLuMaoCar.DisplayChar._jin:buf1[2]=35;break;
            case HuLuMaoCar.DisplayChar._mei:buf1[2]=36;break;
            case HuLuMaoCar.DisplayChar._bai:buf1[2]=37;break;
            case HuLuMaoCar.DisplayChar._he:buf1[2]=38;break;
            case HuLuMaoCar.DisplayChar._kaidan:buf1[2]=96;break;
            case HuLuMaoCar.DisplayChar._bidan:buf1[2]=39;break;
            case HuLuMaoCar.DisplayChar._kai:buf1[2]=40;break;
            case HuLuMaoCar.DisplayChar._guan:buf1[2]=41;break;
            case HuLuMaoCar.DisplayChar._xing:buf1[2]=42;break;
            case HuLuMaoCar.DisplayChar._jia:buf1[2]=43;break;
            case HuLuMaoCar.DisplayChar._dou:buf1[2]=44;break;
            case HuLuMaoCar.DisplayChar._jian:buf1[2]=45;break;
            case HuLuMaoCar.DisplayChar._ju:buf1[2]=46;break;
            case HuLuMaoCar.DisplayChar._xie:buf1[2]=47;break;
            case HuLuMaoCar.DisplayChar._mao:buf1[2]=58;break;
            case HuLuMaoCar.DisplayChar._fen:buf1[2]=59;break;
            case HuLuMaoCar.DisplayChar._xiao:buf1[2]=60;break;
            case HuLuMaoCar.DisplayChar._deng:buf1[2]=61;break;
            case HuLuMaoCar.DisplayChar._da:buf1[2]=62;break;
            case HuLuMaoCar.DisplayChar._wen:buf1[2]=63;break;
            case HuLuMaoCar.DisplayChar._dian:buf1[2]=64;break;
            case HuLuMaoCar.DisplayChar._kaifang:buf1[2]=91;break;
            case HuLuMaoCar.DisplayChar._fanxie:buf1[2]=92;break;
            case HuLuMaoCar.DisplayChar._bifang:buf1[2]=93;break;
            case HuLuMaoCar.DisplayChar._tuo:buf1[2]=94;break;
            case HuLuMaoCar.DisplayChar._xia:buf1[2]=95;break;
            case HuLuMaoCar.DisplayChar._kaihua:buf1[2]=123;break;
            case HuLuMaoCar.DisplayChar._cui:buf1[2]=124;break;
            case HuLuMaoCar.DisplayChar._bihua:buf1[2]=125;break;
            case HuLuMaoCar.DisplayChar._bo:buf1[2]=126;break;
        }
        pins.i2cWriteBuffer(72, buf1);
    }
    
}

//% color="#006400" weight=47 icon="\uf1b9" block="呼噜猫小车行驶类"
namespace HuLuMaoCar2{
    export enum Drive{
        //% blockId="forward" block="前进"
        forward,
        //% blockId="back" block="后退"
        back,
        //% blockId="stop" block="停止"
        stop,
        //% blockId="turn_left" block="向前左转"
        turn_left,
        //% blockId="turn_right" block="向前右转"
        turn_right,
        //% blockId="turn_back_left" block="向后左转"
        turn_back_left,
        //% blockId="turn_back_right" block="向后右转"
        turn_back_right,
        //% blockId="left_hand" block="原地左旋"
        left_hand,
        //% blockId="right_hand" block="原地右旋"
        right_hand
    }
    export enum Drive1{
        //% blockId="turn_left" block="向前左转"
        turn_left,
        //% blockId="turn_right" block="向前右转"
        turn_right,
        //% blockId="turn_back_left" block="向后左转"
        turn_back_left,
        //% blockId="turn_back_right" block="向后右转"
        turn_back_right,
        //% blockId="left_hand" block="原地左旋"
        left_hand,
        //% blockId="right_hand" block="原地右旋"
        right_hand
    }
    export enum Drive2{
        //% blockId="forward" block="前进"
        forward,
        //% blockId="back" block="后退"
        back,
        //% blockId="stop" block="停止"
        stop
    }
    export enum SpeedRank{
        //% blockId="_1" block="1"
        _1=1,
        //% blockId="_2" block="2"
        _2=2,
        //% blockId="_3" block="3"
        _3=3,
        //% blockId="_4" block="4"
        _4=4,
        //% blockId="_5" block="5"
        _5=5,
        //% blockId="_6" block="6"
        _6=6,

    }
    export enum FengShan{
        //% blockId="fan_0" block="停止转动"
        fan_0=0,
        //% blockId="fan_1" block="正转"
        fan_1,
        //% blockId="fan_2" block="反转"
        fan_2
    }
    /**
     * 选择以打开或关闭小车行驶功能,速度可调
     * @param index
    */

    //% blockId=HuLuMaoCar2_Car_DriveSpeed block="控制小车|%index|速度等级为 %index1 级"
    //% weight=102
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_DriveSpeed(index:Drive,index1:SpeedRank):void {
        let buf1 = pins.createBuffer(2);
        basic.pause(10);
        buf1[1]=index1;
        switch (index) {
          case Drive.forward:buf1[0]=21;break;
          case Drive.back:buf1[0]=22;break;
          case Drive.stop:buf1[0]=23;break;
          case Drive.turn_left:buf1[0]=24;break;
          case Drive.turn_right:buf1[0]=25;break;
          case Drive.turn_back_left:buf1[0]=26;break;
          case Drive.turn_back_right:buf1[0]=27;break;
          case Drive.left_hand:buf1[0]=28;break;
          case Drive.right_hand:buf1[0]=29;break;
        }
        pins.i2cWriteBuffer(77, buf1);
    }

    /**
     * 选择以打开或关闭小车行驶功能,每个轮子的转速可调，最高160，约等于6级，最低1，约等于1级
     * @param index
    */
    //% blockId=HuLuMaoCar2_Car_DriveSpeed1 block="控制小车|左轮%index|转速为%index1右轮%index2|转速为%index3"
    //% weight=101
    //% blockGap=10
    //% index1.min=1 index1.max=160
    //% index3.min=1 index3.max=160
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_DriveSpeed1(index:Drive2,index1:number,index2:Drive2,index3:number):void {
        let buf1 = pins.createBuffer(4);
        basic.pause(10);
        buf1[1]=index1;
        switch (index) {
            case Drive2.forward:buf1[0]=1;break;
            case Drive2.back:buf1[0]=2;break;
            case Drive2.stop:buf1[0]=3;break;
        }
        buf1[1]=index1;
        switch(index2){
            case Drive2.forward:buf1[2]=1;break;
            case Drive2.back:buf1[2]=2;break;
            case Drive2.stop:buf1[2]=3;break;
        }
        buf1[3]=index3;
        pins.i2cWriteBuffer(81, buf1);
    }
    /**
     * 选择以打开小车旋转角度,最高180 °
     * @param index
    */

    //% blockId=HuLuMaoCar2_Car_Rotation_angle block="控制小车|%index|旋转角度为 %speed °"
    //% weight=100
    //% blockGap=10
    //% speed.min=0 speed.max=180
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Rotation_angle(index:Drive1,speed:number):void {
        let buf1 = pins.createBuffer(3);
        basic.pause(10);
        if(speed>255){
            buf1[1]=speed-255;
            buf1[2]=255;
        }
        else {
            buf1[1]=0;
            buf1[2]=speed;
        }
           
        switch (index) {
          case Drive1.turn_left:buf1[0]=1;break;
          case Drive1.turn_right:buf1[0]=2;break;
          case Drive1.turn_back_left:buf1[0]=3;break;
          case Drive1.turn_back_right:buf1[0]=4;break;
          case Drive1.left_hand:buf1[0]=5;break;
          case Drive1.right_hand:buf1[0]=6;break;
        }
        pins.i2cWriteBuffer(79, buf1);
    }
    /**
     * 选择以打开小车舵机功能,角度可调
     * @param index
    */
    //% blockId=HuLuMaoCar2_Car_Gear block="舵机转动 %speed °"
    //% weight=99
    //% blockGap=10
     //% speed.min=0 speed.max=180
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Gear(speed:number):void {
       basic.pause(10);
       HuLuMaoCar.IICWrite(78,speed);
    }

    /**
     * 选择以打开或关闭风扇转动功能
     * @param index
    */
    //% blockId=HuLuMaoCar2_fan block="控制风扇 %speed"
    //% weight=98
    //% blockGap=10
     //% speed.min=0 speed.max=180
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function fan(index:FengShan):void {
        let buf;
        basic.pause(10);
        switch(index){
            case FengShan.fan_0:buf=0;break;
            case FengShan.fan_1:buf=1;break;
            case FengShan.fan_2:buf=2;break;
        }
        HuLuMaoCar.IICWrite(74,buf);
     }
}
//% color="#006400" weight=46 icon="\uf1b9" block="呼噜猫小车与遥控器通信类"
namespace HuLuMaoCar_Remote {
    
    /**
     *"接收遥控器发送过来的指令" 和  "向遥控器发送指令" 不可在同一程序中使用
     * @param index
    */
    //% blockId=HuLuMaoCar_Remote_Remote_Car block="接收遥控器发送过来的指令"
    //% weight=100
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Remote_Car():void {
        basic.pause(10);
        pins.i2cWriteNumber(76, 1, NumberFormat.UInt8LE); 
    }
    /**
     *"向遥控器发送指令" 和 "接收遥控器发送过来的指令" 不可在同一程序中使用
     * @param index
    */
    //% blockId=HuLuMaoCar_Remote_Car_Remote block="向遥控器发送指令"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Remote():void {
        basic.pause(10);
        pins.i2cWriteNumber(76, 2, NumberFormat.UInt8LE); 
    }
    /**
     *
     * @param index
    */
    //% blockId=HuLuMaoCar_Remote_Car_Remote_CM block="向遥控器发送超声波测到的距离"
    //% weight=98
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Remote_CM():void {
        basic.pause(10);
        pins.i2cWriteNumber(80, 2, NumberFormat.UInt8LE); 
    }
}