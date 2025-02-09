const supabase = require("../../config/supabase");

exports.get = async (req, res) => {
  try {
    const { data: data_job, error } = await supabase
      .from("Job_details")
      .select("*");

    return res.status(200).json({
      type: "success",
      data: data_job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
