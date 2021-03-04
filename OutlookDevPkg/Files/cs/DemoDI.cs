using OutlookDevPkg.API;
using Terrasoft.Core.Factories;

namespace OutlookDevPkg
{
	[DefaultBinding(typeof(IDemoDI))]
	public class DemoDI : IDemoDI
	{
		public int Add(int x, int y)
		{


			var conf = Terrasoft.Core.Factories.ClassFactory.Get<IConfToClio>();
			conf.PostMessageToAll(GetType().Name, "Demo WebSocketMessage");

			return x + y;
		}
		public int Multiply(int x, int y)
		{
			return x * y;
		}
	}
}
