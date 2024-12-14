import { connectToMongoDB } from "@/lib/mongodb";
import device_owner from "@/models/device_owner";
import user from "@/models/user";

/**
 * @swagger
 * /api/owners:
 *   get:
 *     summary: Get list of device owners
 *     description: Retrieves all device owners from the database.
 *     responses:
 *       200:
 *         description: List of device owners
 *       400:
 *         description: Failed to fetch device owners
 */
export async function GET() {

    try {
        await connectToMongoDB();
        const list = await device_owner.find();
        // var ownerlist=[...list]
        var userlist=[]
        const aggregated = {};

        list.forEach((item) => {
            const { user_id, d_id } = item;
            if (user_id) {
                if (!aggregated[user_id]) {
                    aggregated[user_id] = [];
                }
                aggregated[user_id].push(d_id);
            }
        });

        // Convert the aggregated result into a list of objects
        const result = Object.keys(aggregated).map((user_id) => ({
            user_id,
            d_ids: aggregated[user_id],
        }));

        const final= await processResults(result);
        console.log("test")
        console.log(final)

        
        return Response.json({ data: final }, { status: 200 });

        
    } catch (error) {
        return Response.json({
            message: error
        })
    }
}

async function processResults(result) {
    const final = [];
  
    await Promise.all(result.map(async (data) => {
      var user_name = await user.find({ "user_id": data.user_id });
      var dic = { ...data, user_name: user_name[0]?.username };
      final.push(dic);
    }));
  
    return final;
  }