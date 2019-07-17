from flask import Flask, jsonify, abort
from flask_restful.utils.cors import crossdomain
import pdb
app = Flask(__name__)
MINIFED_PROPOSALS = {
        'cs':
            [
                {
                    "id": 1,
                    "title": "Cs proposal 1",
                },

                {
                    "id": 2,
                    "title": "Cs proposal 2",

                }
            ],
             'pp':
            [
                {
                    "id": 1,
                    "title": "PP proposal 1",
                },

                {

                    "id": 2,
                    "title": "PP proposal 2",

                }
            ]
    }

PROPOSALS = {
        'cs':
            [
                {
                "id": 1,
                "title": "Cs proposal 1",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit massa ut libero convallis, non pretium tortor sollicitudin. Duis non ultricies ex, a mattis urna. Nulla in congue turpis, eget suscipit ipsum. Nunc mattis ante id ligula pretium fringilla. Morbi eu quam rhoncus, sollicitudin lorem sit amet, tincidunt nunc. Nunc faucibus augue lacinia venenatis vehicula. Vestibulum ut dolor ante. Nullam vel enim vitae diam ultrices elementum. Nam lorem eros, elementum ut sodales ac, egestas quis ipsum.",
                "topic": "Donec tincidunt leo eu euismod tempor. Etiam tincidunt velit a sapien dignissim, a vehicula turpis pulvinar. Praesent vitae blandit neque. Proin porta quis nunc in malesuada. Cras aliquet eget tellus sit amet lobortis. Vivamus a placerat metus, quis interdum nisl. Aenean blandit, metus nec porttitor ultrices, orci urna dictum nulla, ut tempus ex velit id lectus. Vivamus augue libero, mollis ac hendrerit accumsan, finibus ac orci. Pellentesque mollis urna at ligula feugiat tempor. ",
                "subtopic":"Nulla ac ante mi. Vivamus fermentum egestas dapibus. Curabitur et velit eu ex consequat vulputate. Sed in fringilla urna. In ornare vitae eros nec rhoncus. Nam quis tincidunt eros. Aenean at metus gravida, accumsan orci nec, lobortis ante. Vivamus lorem quam, euismod ac maximus id, feugiat aliquet dui. Suspendisse at turpis sapien. Sed eget augue vel nisl mattis placerat eget hendrerit neque. Pellentesque ac velit diam. "
                },

                {
                    "id": 2,
                    "title": "Cs proposal 2",
                    "body": "Pellentesque non neque interdum, elementum arcu ac, eleifend quam. Etiam imperdiet vitae metus vel mattis. Nulla neque massa, sagittis quis arcu vitae, facilisis egestas purus. Aliquam non metus lectus. Duis et malesuada est, non pharetra quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sit amet sodales lorem. Mauris ornare eget leo vel consectetur. Donec arcu augue, consequat id dui in, condimentum bibendum diam. Sed sollicitudin, sem iaculis gravida pellentesque, sapien lorem ornare arcu, vel hendrerit sem mi viverra dui. Vestibulum vitae augue sed purus pulvinar molestie et egestas dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur euismod condimentum mauris, vitae semper lorem tempor quis. In augue risus, placerat vel ex quis, scelerisque ullamcorper odio. Donec sit amet elit a ligula aliquet scelerisque. Etiam finibus lobortis erat, quis viverra sapien bibendum varius. ",
                    "topic":" Nullam gravida lacinia lobortis. Nullam semper tincidunt dictum. Integer nec aliquam ligula. Phasellus molestie nibh rutrum ultricies lobortis. Curabitur aliquet risus vitae finibus mattis. In hac habitasse platea dictumst. Nulla facilisi. ",
                    "subotpic": "Pellentesque finibus eros at risus imperdiet, nec sollicitudin lacus varius. Maecenas sit amet orci at nunc semper hendrerit sed vel turpis. Mauris dictum tempor odio, a tincidunt turpis scelerisque eu. Donec eros dui, blandit a sodales id, aliquet at diam. Curabitur non nisl porttitor, egestas odio nec, condimentum ante. Fusce vel enim luctus, tempor lectus ac, congue sapien. Nunc eu suscipit metus. Aliquam pulvinar fermentum enim, eu dignissim lacus laoreet sit amet. Integer blandit rutrum est vel placerat. Fusce pharetra sodales dictum. Fusce lobortis est ut faucibus tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus."

                }
            ],
             'pp':
            [
                {
                "id": 1,
                "title": "PP proposal 1",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit massa ut libero convallis, non pretium tortor sollicitudin. Duis non ultricies ex, a mattis urna. Nulla in congue turpis, eget suscipit ipsum. Nunc mattis ante id ligula pretium fringilla. Morbi eu quam rhoncus, sollicitudin lorem sit amet, tincidunt nunc. Nunc faucibus augue lacinia venenatis vehicula. Vestibulum ut dolor ante. Nullam vel enim vitae diam ultrices elementum. Nam lorem eros, elementum ut sodales ac, egestas quis ipsum.",
                "topic": "Donec tincidunt leo eu euismod tempor. Etiam tincidunt velit a sapien dignissim, a vehicula turpis pulvinar. Praesent vitae blandit neque. Proin porta quis nunc in malesuada. Cras aliquet eget tellus sit amet lobortis. Vivamus a placerat metus, quis interdum nisl. Aenean blandit, metus nec porttitor ultrices, orci urna dictum nulla, ut tempus ex velit id lectus. Vivamus augue libero, mollis ac hendrerit accumsan, finibus ac orci. Pellentesque mollis urna at ligula feugiat tempor. ",
                "subtopic":"Nulla ac ante mi. Vivamus fermentum egestas dapibus. Curabitur et velit eu ex consequat vulputate. Sed in fringilla urna. In ornare vitae eros nec rhoncus. Nam quis tincidunt eros. Aenean at metus gravida, accumsan orci nec, lobortis ante. Vivamus lorem quam, euismod ac maximus id, feugiat aliquet dui. Suspendisse at turpis sapien. Sed eget augue vel nisl mattis placerat eget hendrerit neque. Pellentesque ac velit diam. "
                },

                {
                    "id": 2,
                    "title": "PP proposal 2",
                    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit massa ut libero convallis, non pretium tortor sollicitudin. Duis non ultricies ex, a mattis urna. Nulla in congue turpis, eget suscipit ipsum. Nunc mattis ante id ligula pretium fringilla. Morbi eu quam rhoncus, sollicitudin lorem sit amet, tincidunt nunc. Nunc faucibus augue lacinia venenatis vehicula. Vestibulum ut dolor ante. Nullam vel enim vitae diam ultrices elementum. Nam lorem eros, elementum ut sodales ac, egestas quis ipsum.",
                    "topic": "Donec tincidunt leo eu euismod tempor. Etiam tincidunt velit a sapien dignissim, a vehicula turpis pulvinar. Praesent vitae blandit neque. Proin porta quis nunc in malesuada. Cras aliquet eget tellus sit amet lobortis. Vivamus a placerat metus, quis interdum nisl. Aenean blandit, metus nec porttitor ultrices, orci urna dictum nulla, ut tempus ex velit id lectus. Vivamus augue libero, mollis ac hendrerit accumsan, finibus ac orci. Pellentesque mollis urna at ligula feugiat tempor. ",
                    "subtopic":"Nulla ac ante mi. Vivamus fermentum egestas dapibus. Curabitur et velit eu ex consequat vulputate. Sed in fringilla urna. In ornare vitae eros nec rhoncus. Nam quis tincidunt eros. Aenean at metus gravida, accumsan orci nec, lobortis ante. Vivamus lorem quam, euismod ac maximus id, feugiat aliquet dui. Suspendisse at turpis sapien. Sed eget augue vel nisl mattis placerat eget hendrerit neque. Pellentesque ac velit diam. "

                }
            ]
    }



PARTIES = {
    'pp': ['partido popular', 'populares'],
    'cs': ['ciudadanos', 'cs', 'c\'s'],
    'psoe': ['partido socialista obrero español', 'pspv', 'psoe-a'],
    'up': ['unidas podemos', 'podemos']
}



@app.route('/proposals', methods=['GET'])
@crossdomain(origin='*')
def readProposals():
    return jsonify({
        'proposals': MINIFED_PROPOSALS
    })

@app.route('/proposals/<string:party_id>/<int:proposal_id>', methods=['GET'])
@crossdomain(origin='*')
def readProposal(party_id, proposal_id):
    if party_id in PARTIES.keys():
        for proposal in PROPOSALS[party_id]:
            if proposal['id'] == proposal_id:
                return jsonify({
                    'proposal': proposal
                })
    abort('404')


@app.route('/parties', methods=['GET'])
@crossdomain(origin='*')
def readParties():
    return jsonify({
        "parties": PARTIES
    })



if __name__ == '__main__':
    app.run(debug=True)


