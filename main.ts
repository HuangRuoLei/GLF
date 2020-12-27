//% color="#4169E1" weight=50 icon="\uf1b0" block="呼噜猫光立方通信确认"
namespace HuLuMaoGLF_connection {
    /**
     * 调用此来建立MicroBit与光立方的通信
     * @param index
    */
    //% blockId=HuLuMaoGLF_connection_con block="建立 MicroBit 与光立方的通信"
    //% weight=100
    //% blockGap=10
    //% color="#4169E1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con(): void {
        let length;
        let length1;
        for(let i=0;i<2;i++){
            basic.pause(10);
            length1=pins.i2cReadNumber(64, NumberFormat.UInt8LE);
            if(length1==44){
                break;
            }
        }
        for(let i=0;i<20;i++){
            basic.pause(10);
            length=pins.i2cReadNumber(66, NumberFormat.UInt8LE);
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
}

//% color="#4169E1" weight=50 icon="\uf1b0" block="呼噜猫光立方显示类"
namespace HuLuMaoGLF_display { 
    export enum XYZ{
        //% blockId="_1" block="1"
        _1 = 1,
        //% blockId="_2" block="2"
        _2,
        //% blockId="_3" block="3"
        _3,
        //% blockId="_4" block="4"
        _4,
        //% blockId="_5" block="5"
        _5,
        //% blockId="_6" block="6"
        _6,
        //% blockId="_7" block="7"
        _7,
        //% blockId="_8" block="8"
        _8
    }

    /**
     * 调用此来点亮某个LED灯
     * @param index
    */
    //% blockId=HuLuMaoGLF_display_dispaly_one block="点亮第|%index层(z)，第|%index1列(y)，第|%index2个(x)处LED"
    //% weight=100
    //% blockGap=10
    //% index.min=0 index.max=7
    //% index1.min=0 index1.max=7
    //% index2.min=0 index2.max=7
    //% color="#4169E1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function dispaly_one(index:number,index1:number,index2:number): void {
        let buf = pins.createBuffer(3);
        basic.pause(10);
        buf[0] = ~(0x01 << (7 - index));
        buf[1] = (0x01 << (7 - index1));
        buf[2] = 0x01<<index2;
        pins.i2cWriteBuffer(65, buf);
    }
    
   /**
     * 调用此来点亮某层LED灯
     * @param index
    */
    //% blockId=HuLuMaoGLF_display_dispaly1 block="点亮第|%index层(z)LED"
    //% weight=99
    //% blockGap=10
    //% index.min=0 index.max=7
    //% color="#4169E1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function dispaly1(index:number): void {
        let buf=pins.createBuffer(2);
        buf[0]=1;
        basic.pause(10);
        buf[1] = ~(0x01 << (7 - index));
        pins.i2cWriteBuffer(66, buf);
    }

    /**
     * 调用此来点亮某列LED灯
     * @param index
    */
    //% blockId=HuLuMaoGLF_display_dispaly2 block="点亮第|%index列(y)LED"
    //% weight=98
    //% blockGap=10
    //% index.min=0 index.max=7
    //% color="#4169E1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function dispaly2(index:number): void {
        let buf=pins.createBuffer(2);
        buf[0]=2;
        basic.pause(10);
        buf[1] =(0x01 << (7 - index));
        pins.i2cWriteBuffer(66, buf);
    }

     /**
     * 调用此来点亮某排LED灯
     * @param index
    */
    //% blockId=HuLuMaoGLF_display_dispaly3 block="点亮第|%index排(x)LED"
    //% weight=97
    //% blockGap=10
    //% index.min=0 index.max=7
    //% color="#4169E1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function dispaly3(index:number): void {
        let buf=pins.createBuffer(2);
        buf[0]=3;
        basic.pause(10);
        buf[1] =0x01<<index;
        pins.i2cWriteBuffer(66, buf);
    }

    /**
     * 调用此来点亮自定义LED灯
     * @param index
    */
    //% blockId=HuLuMaoGLF_display_dispaly4 block="光立方绘图 层数值(z)|%index,列数值(y)|%index1,排数值(x)|%index2"
    //% weight=96
    //% blockGap=10
    //% index.min=0 index.max=255
    //% index1.min=0 index1.max=255
    //% index2.min=0 index2.max=255
    //% color="#4169E1"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function dispaly4(index:number,index1:number,index2:number): void {
        let buf = pins.createBuffer(3);
        basic.pause(10);
        buf[0] = index;
        buf[1] = index1;
        buf[2] = index2;
        pins.i2cWriteBuffer(67, buf);
    }
}

