# Which tool do I need?

Three independent tools for single-cell multimodal data. They don't share a data
format or API. Pick the one that matches your goal, then open its site: the
Quickstart for a first run, and "How it works" for the method.

| Your goal | Use | What you get |
|---|---|---|
| **Integrate** multimodal data across conditions or patients, and trace results back to genes, cells, and cell types | [**M3**](https://pyanglab.github.io/M3/) | Condition-aware latent factors, patient-level predictions, gene, cell, and cell-type attributions |
| **Compare & choose** an integration method, from our benchmark or on your own data | [**scMultiBench**](https://dsichang.github.io/scMultiBench/) | 40+ methods scored with scIB metrics, rankings & bubble plots, reproduce them on your own data |
| **Train one model for many tasks** on multimodal data, classify cells, reduce dimensions, select markers, simulate cells | [**Matilda**](https://pyanglab.github.io/Matilda/) | Cell-type predictions, embeddings, marker genes, synthetic cells |

## Set up

The three packages are on PyPI. They install into one Python environment,
together or one at a time. Python 3.10 or newer runs all three. Make a new
environment for them:

=== "Conda"

    ```bash title="terminal"
    conda create -n omics python=3.12 -y
    conda activate omics
    pip install m3-sc multibench-sc matilda-sc
    python -c "import m3, matilda, multibench; print('ready')"
    ```

=== "venv, Linux and macOS"

    ```bash title="terminal"
    python3 --version    # must print 3.10 or newer
    python3 -m venv ~/omics-env
    source ~/omics-env/bin/activate
    pip install m3-sc multibench-sc matilda-sc
    python -c "import m3, matilda, multibench; print('ready')"
    ```

=== "venv, Windows PowerShell"

    ```powershell title="PowerShell"
    py --version         # must print 3.10 or newer
    py -m venv "$HOME\omics-env"
    $py = "$HOME\omics-env\Scripts\python.exe"
    & $py -m pip install m3-sc multibench-sc matilda-sc
    & $py -c "import m3, matilda, multibench; print('ready')"
    ```

    If PowerShell does not know `py`, write `python` in the first two lines.

The last line prints `ready` when the three packages import.

For one tool only, name its package alone, for example `pip install m3-sc`.

### After the install

| Tool | Ready after the install | One more step |
|---|---|---|
| **M3** | Everything. The demo dataset is in the package. | None. Start with its [Quickstart](https://pyanglab.github.io/M3/quickstart/). |
| **Matilda** | Everything. Its Quickstart downloads a 75 MB demo dataset. | None. Start with its [Quickstart](https://pyanglab.github.io/Matilda/quickstart/). |
| **scMultiBench** | The stored results, data checks, scoring and plots, on any system. | To run a method, install its environment first: `mtb.env.install(["StabMap"])`. Methods run on Linux, and on Windows for [most methods](https://dsichang.github.io/scMultiBench/installation/#windows). They do not run on macOS. Start with its [Quickstart](https://dsichang.github.io/scMultiBench/quickstart/). |

The import names are `m3`, `matilda` and `multibench`.

### Details

??? note "Disk space and GPU"

    The environment takes about 1 GB on macOS and Windows, and 6 GB on
    Linux, where pip installs PyTorch with its CUDA libraries. M3 and
    Matilda use an NVIDIA GPU when PyTorch finds one, and the CPU otherwise.

    On Windows, pip installs the CPU build of PyTorch, also on a computer
    with a GPU. [Step 2 of M3's installation](https://pyanglab.github.io/M3/installation/#step-2-pytorch-usually-nothing-to-do)
    shows how to choose another build.

    Each scMultiBench method environment is a separate download.
    `mtb.env.install(["StabMap"], dry_run=True)` shows its size first.

??? note "Notebooks"

    The tutorials of the three sites are Jupyter notebooks. To run them on
    your computer, add JupyterLab and a kernel to the environment:

    ```bash title="terminal"
    pip install jupyterlab
    python -m ipykernel install --user --name omics
    ```

    Then start `jupyter lab` and choose the kernel `omics`.

??? note "Google Colab"

    Colab needs no environment. Run the install in a notebook cell, then
    import the packages in the next cell. The runtime needs no restart.

    ```python title="notebook cell"
    !pip install m3-sc multibench-sc matilda-sc
    ```

    pip ends with a line saying that `google-colab` requires another pandas
    version. The three packages work, and scMultiBench methods run.

??? note "R"

    M3 and Matilda also have R packages, which install from GitHub. See
    [M3](https://pyanglab.github.io/M3/installation/#installing-the-r-package)
    and [Matilda](https://pyanglab.github.io/Matilda/installation/#install-matilda).

### Troubleshooting

??? note "`No matching distribution found for m3-sc`"

    The environment's Python is 3.9 or older, and M3 needs 3.10. The
    `python3` that comes with macOS is 3.9. Make the environment with a newer
    Python, as the Conda block does.

??? note "`TypingError` naming `knn_dists`, or `'csr_array' object has no attribute 'getnnz'`"

    scanpy's neighbour graph and UMAP fail on 8,192 cells or more with
    umap-learn 0.6.0, and on Python 3.10 and 3.11 with pynndescent 0.7.0.
    Replace them:

    ```bash title="terminal"
    pip install "umap-learn!=0.6.0" "pynndescent<0.7"
    ```

??? note "`error: externally-managed-environment`"

    pip was run outside an environment, and the system's Python refuses
    that. Make the environment first, with one of the blocks above.

??? note "`llvmlite needs CMake tools to build`, on a Mac with an Intel processor"

    Some of the newest dependencies have no build for Intel Macs, and the
    last PyTorch for them needs NumPy 1. Make the environment with Python
    3.12 and install with this line instead:

    ```bash title="terminal"
    pip install --only-binary=:all: "numpy<2" "pynndescent<0.7" \
        m3-sc multibench-sc matilda-sc
    ```
