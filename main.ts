//% color="#006400" weight=50 icon="\uf1b9" block="呼噜猫光立方通信确认"
namespace HuLuMaoGLF_connection {

    export enum connet{
        //% blockId="no" block="不建立"
        no = 0,
        //% blockId="yes" block="建立"
        yes = 1
    }
    /**
     * 调用此来建立MicroBit与光立方的通信
     * @param index
    */
    //% blockId=HuLuMaoGLF_connection_con block="建立 MicroBit 与光立方的通信"
    //% weight=100
    //% blockGap=10
    //% color="#006400"
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

    /**
     * 调用此来建立光立方与遥控器的通信,并设置一个通信密码(最大为255)
     * @param index
    */
    //% blockId=HuLuMaoGLF_connection_con1 block="光立方与遥控器|%index1通信,通信密码为|%index"
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
                data=pins.i2cReadNumber(75, NumberFormat.UInt8LE);
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

//% color="#006400" weight=50 icon="\uf1b9" block="呼噜猫光立方显示类"
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
     * 调用此来点亮其中一个LED灯
     * @param index
    */
    //% blockId=HuLuMaoGLF_connection_dispaly_one block="点亮第|%index层(z)，第|%index1列(y)，第|%index2个(x)处LED"
    //% weight=100
    //% blockGap=10
    //% index.min=1 index.max=8
    //% index1.min=1 index1.max=8
    //% index2.min=1 index2.max=8
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function dispaly_one(index:number,index1:number,index2:number): void {
        let buf = pins.createBuffer(3);
        basic.pause(10);
        buf[0] = ~(0x01 << (8 - index));
        buf[1] = (0x01 << (8 - index1));
        buf[2] = index2;
        pins.i2cWriteBuffer(65, buf);
    }
    /*
    export function dispaly_one(index:XYZ,index1:XYZ,index2:XYZ): void {
        let buf = pins.createBuffer(3);
        basic.pause(11);
        buf[0] = ~(0x01 << (8 - index));
        buf[1] = (0x01 << (8 - index1));
        buf[2] = index2;
        pins.i2cWriteBuffer(65, buf);
    }
    */
}

