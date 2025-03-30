export async function GET(_, { params }) {
    try {

        const { id } = params;

        await connectToMongoDB();
        const topic_list=[]

        let devices = await device_owner.find({"user_id": uid});
        let device_arr = []

        
        devices.map(device => {
            device_arr.push(device.d_id)
        })

        console.log(device_arr);

        const dev = await Device.findById(params.id);
        if (dev) {
            return Response.json({
                dev
            })
        }

      return Response.json({
        message: `Device ${params.id} not found`
      },
        {
          status: 400
        })
    } catch (error) {
      return Response.json({
        message: error
      }, {
        status: 400
      })
    }
  }