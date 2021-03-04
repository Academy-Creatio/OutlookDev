using Terrasoft.Core;
using OutlookDevPkg.API;
using Terrasoft.Core.Factories;

namespace OutlookDevPkg.Conf
{
	
	[DefaultBinding(typeof(IConfToClio))]
	public class ConfToClio : OutlookDevPkg.API.IConfToClio
	{
		public void PostMessage(UserConnection userConnection, string senderName, string messageText)
		{
			Terrasoft.Configuration.MsgChannelUtilities.PostMessage(userConnection, senderName, messageText);
		}
		
		public void PostMessageToAll(string senderName, string messageText)
		{
			Terrasoft.Configuration.MsgChannelUtilities.PostMessageToAll(senderName, messageText);
		}
	}
}