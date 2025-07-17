import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Withdrawals = () => {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch user coin info
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userCoin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userFind?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const withdrawCoin = watch("withdrawal_coin");
  const withdrawAmount = withdrawCoin ? Math.floor(Number(withdrawCoin) / 20) : 0;
  const isEligible = (userData?.coin || 0) >= 200;

  // ✅ Mutation for withdrawal
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/withdrawPost", formData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.insertedId) {
        Swal.fire("Success", "Withdrawal request submitted!", "success");
        reset();
        queryClient.invalidateQueries(["userCoin"]);
      } else {
        Swal.fire("Error", data.message || "Something went wrong.", "error");
      }
    },
    onError: () => {
      Swal.fire("Error", "Network error or server issue.", "error");
    },
  });

  const onSubmit = (data) => {
    if (Number(data.withdrawal_coin) > userData?.coin) {
      return Swal.fire("Error", "You cannot withdraw more than your available coin.", "error");
    }

    const payload = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: Number(data.withdrawal_coin),
      withdrawal_amount: withdrawAmount,
      payment_system: data.payment_system,
      account_number: data.account_number,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    console.log(payload);
    mutation.mutate(payload);
  };

  if (isLoading || loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow-md max-md:mx-5">
      <h2 className="text-2xl font-bold mb-4">Withdraw Coins</h2>

      <div className="mb-6">
        <p className="text-lg">
          Available Coin: <span className="font-bold">{userData?.coin}</span>
        </p>
        <p className="text-lg">
          Equivalent USD: <span className="font-bold">${Math.floor(userData?.coin / 20)}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Coin + Amount side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="form-control flex-1">
            <label htmlFor="withdrawal_coin" className="text-sm font-medium mb-1 block">
              Coin to Withdraw
            </label>
            <input
              id="withdrawal_coin"
              type="number"
              className="input input-bordered w-full"
              {...register("withdrawal_coin", {
                required: true,
                min: 20,
                max: userData?.coin,
              })}
            />
            {errors.withdrawal_coin && <span className="text-error text-sm">Enter a valid coin amount (min 20)</span>}
          </div>

          <div className="form-control w-full md:w-40">
            <label htmlFor="withdrawal_amount" className="text-sm font-medium mb-1 block">
              Amount ($)
            </label>
            <input
              id="withdrawal_amount"
              type="number"
              className="input input-bordered w-full"
              value={String(withdrawAmount)}
              readOnly
            />
          </div>
        </div>

        {/* Payment System */}
        <div className="form-control">
          <label htmlFor="payment_system" className="text-sm font-medium mb-1 block">
            Select Payment System
          </label>
          <select
            id="payment_system"
            className="select select-bordered w-full"
            {...register("payment_system", { required: true })}
          >
            <option value="">Choose one</option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="Rocket">Rocket</option>
          </select>
          {errors.payment_system && <span className="text-error text-sm">Please select a payment system</span>}
        </div>

        {/* Account Number */}
        <div className="form-control">
          <label htmlFor="account_number" className="text-sm font-medium mb-1 block">
            Account Number
          </label>
          <input
            id="account_number"
            type="text"
            className="input input-bordered w-full"
            {...register("account_number", {
              required: true,
              pattern: {
                value: /^01\d{9}$/,
                message: "Account number must be 11 digits and start with '01'",
              },
            })}
          />
          {errors.account_number && (
            <span className="text-error text-sm">{errors.account_number.message || "Account number is required"}</span>
          )}
        </div>

        {/* Submit Button */}
        {isEligible ? (
          <button className="btn btn-primary w-full" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Submitting..." : "Submit Withdrawal"}
          </button>
        ) : (
          <p className="text-error text-center font-semibold">Insufficient coin to withdraw (Minimum 200 required)</p>
        )}
      </form>
    </div>
  );
};

export default Withdrawals;
