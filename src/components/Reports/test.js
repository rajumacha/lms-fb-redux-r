// <div>
// 	<h5>
// 		<u>Summary: </u>
// 	</h5>
// 	<h6>
// 		Total Customers <span>{customers.length}</span>
// 	</h6>

// 	<h6>
// 		Interested - Yes
// 		<span>
// 			{customers.reduce((tot, cus, idx) => {
// 				if (cus.interested === "yes") {
// 					return (tot += 1);
// 				}
// 				return tot;
// 			}, 0)}
// 		</span>
// 	</h6>
// 	<h6>
// 		Interested - No
// 		<span>
// 			{customers.reduce((tot, cus, idx) => {
// 				if (cus.interested === "no") {
// 					return (tot += 1);
// 				}
// 				return tot;
// 			}, 0)}
// 		</span>
// 	</h6>
// 	<h6>
// 		Interested - Followup
// 		<span>
// 			{customers.reduce((tot, cus, idx) => {
// 				if (cus.interested === "followup") {
// 					return (tot += 1);
// 				}
// 				return tot;
// 			}, 0)}
// 		</span>
// 	</h6>
// </div>
